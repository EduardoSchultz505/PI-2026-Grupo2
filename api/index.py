import os
from datetime import datetime
from typing import Literal
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from passlib.context import CryptContext
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, create_engine, desc
from sqlalchemy.orm import sessionmaker, Session, declarative_base, relationship
import libsql_experimental as libsql

# -----------------------------------------------------------------------------
# CONFIGURAÇÃO DO BANCO DE DADOS (Turso na Vercel / SQLite Local para testes)
# -----------------------------------------------------------------------------
TURSO_URL = os.environ.get("TURSO_DATABASE_URL")
TURSO_TOKEN = os.environ.get("TURSO_AUTH_TOKEN")

if TURSO_URL and TURSO_TOKEN:
    # Função criadora de conexão usando a biblioteca oficial do Turso
    def get_turso_connection():
        return libsql.connect(database=TURSO_URL, auth_token=TURSO_TOKEN)

    # O SQLAlchemy usa o dialeto padrao de SQLite, mas pega a conexao do Turso
    engine = create_engine(
        "sqlite://",
        creator=get_turso_connection,
        connect_args={"check_same_thread": False}
    )
else:
    # Fallback para o SQLite local caso rode fora da Vercel
    engine = create_engine("sqlite:///./silotech.db", connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

# -----------------------------------------------------------------------------
# MODELOS DO BANCO DE DADOS (SQLAlchemy)
# -----------------------------------------------------------------------------
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String, default="user")
    leituras = relationship("Leitura", back_populates="dono")

class Leitura(Base):
    __tablename__ = "leituras"
    id = Column(Integer, primary_key=True, index=True)
    sensor_nome = Column(String, index=True)
    temperatura = Column(Float)
    umidade = Column(Float)
    horario = Column(DateTime, default=datetime.now)
    owner_id = Column(Integer, ForeignKey("users.id"))
    
    dono = relationship("User", back_populates="leituras")

# Cria as tabelas se não existirem
Base.metadata.create_all(bind=engine)

# -----------------------------------------------------------------------------
# SCHEMAS (Pydantic)
# -----------------------------------------------------------------------------
class UserCreate(BaseModel):
    username: str = Field(..., min_length=3)
    email: str = Field(...)
    password: str = Field(..., min_length=8)
    role: Literal["user", "admin"] = "user"

class LoginRequest(BaseModel):
    email: str
    password: str

class LeituraCreate(BaseModel):
    sensor_nome: str
    temperatura: float
    umidade: float
    owner_id: int

# -----------------------------------------------------------------------------
# INICIALIZAÇÃO DO FASTAPI
# -----------------------------------------------------------------------------
app = FastAPI(title="SiloTech API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------------------------------------------------------
# FUNÇÕES AUXILIARES E DEPENDÊNCIAS
# -----------------------------------------------------------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def verificar_senha(senha_digitada, senha_criptografada):
    return pwd_context.verify(senha_digitada, senha_criptografada)

def gerar_hash_senha(password: str):
    return pwd_context.hash(password)

def obter_usuario_ou_404(db: Session, owner_id: int):
    usuario = db.query(User).filter(User.id == owner_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário dono não encontrado.")
    return usuario

@app.on_event("startup")
def startup():
    # Cria as tabelas automaticamente no Turso caso não existam
    Base.metadata.create_all(bind=engine)

@app.get("/api")
def raiz():
    return {"status": "online", "api": "SiloTech"}

@app.post("/api/cadastro", status_code=status.HTTP_201_CREATED)
def cadastro(
    request: UserCreate,
    admin_id: int,
    db: Session = Depends(get_db)
):
    admin = db.query(User).filter(User.id == admin_id).first()

    if not admin:
        raise HTTPException(404, "Administrador não encontrado.")

    if admin.role != "admin":
        raise HTTPException(403, "Apenas administradores podem cadastrar usuários.")

    if db.query(User).filter(User.email == request.email).first():
        raise HTTPException(400, "E-mail já cadastrado.")

    novo_usuario = User(
        username=request.username.strip(),
        email=request.email,
        password=gerar_hash_senha(request.password),
        role=request.role
    )

    db.add(novo_usuario)
    db.commit()

    return {"status": "sucesso"}

@app.post("/api/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()

    if not user or not verificar_senha(request.password, user.password):
        raise HTTPException(status_code=401, detail="Credenciais incorretas.")

    return {
        "status": "sucesso",
        "message": f"Bem-vindo, {user.username}!",
        "username": user.username,
        "user_id": user.id,
        "role": user.role
    }

@app.post("/api/sensor/leitura")
def adicionar_leitura(request: LeituraCreate, db: Session = Depends(get_db)):
    obter_usuario_ou_404(db, request.owner_id)

    sensor_nome = request.sensor_nome.strip()
    if not sensor_nome:
        raise HTTPException(status_code=400, detail="Nome do sensor não pode ficar vazio.")

    nova_leitura = Leitura(
        sensor_nome=sensor_nome,
        temperatura=request.temperatura,
        umidade=request.umidade,
        owner_id=request.owner_id
    )
    
    try:
        db.add(nova_leitura)
        db.commit()

        leituras_antigas = db.query(Leitura).filter(
            Leitura.owner_id == request.owner_id,
            Leitura.sensor_nome == sensor_nome
        ).order_by(desc(Leitura.horario)).all()

        if len(leituras_antigas) > 12:
            for extra in leituras_antigas[12:]:
                db.delete(extra)
            db.commit()

        return {"status": "sucesso", "msg": f"Leitura registrada para {sensor_nome}"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/sensor/meu-historico/{usuario_id}")
def obter_historico_pessoal(usuario_id: int, sensor: str, db: Session = Depends(get_db)):
    dados = db.query(Leitura).filter(
        Leitura.owner_id == usuario_id,
        Leitura.sensor_nome == sensor
    ).order_by(desc(Leitura.horario)).limit(12).all()
    
    return dados

@app.get("/api/sensor/lista-sensores/{usuario_id}")
def listar_sensores_usuario(usuario_id: int, db: Session = Depends(get_db)):
    obter_usuario_ou_404(db, usuario_id)

    nomes_leituras = [
        sensor[0] for sensor in db.query(Leitura.sensor_nome).filter(
            Leitura.owner_id == usuario_id
        ).distinct().all()
    ]

    return sorted(nomes_leituras)

@app.get("/api/sensor/alertas/{usuario_id}")
def gerar_alertas(usuario_id: int, db: Session = Depends(get_db)):
    alertas = []

    sensores = db.query(Leitura.sensor_nome).filter(
        Leitura.owner_id == usuario_id
    ).distinct().all()

    for sensor in sensores:
        nome_sensor = sensor[0]

        ultima_leitura = db.query(Leitura).filter(
            Leitura.owner_id == usuario_id,
            Leitura.sensor_nome == nome_sensor
        ).order_by(desc(Leitura.horario)).first()

        if not ultima_leitura:
            continue

        if ultima_leitura.temperatura > 20:
            alertas.append({
                "sensor": nome_sensor,
                "tipo": "temperatura",
                "mensagem": f"Temperatura alta ({ultima_leitura.temperatura}°C)"
            })

        if ultima_leitura.temperatura < 10:
            alertas.append({
                "sensor": nome_sensor,
                "tipo": "temperatura",
                "mensagem": f"Temperatura baixa ({ultima_leitura.temperatura}°C)"
            })

        if ultima_leitura.umidade > 14:
            alertas.append({
                "sensor": nome_sensor,
                "tipo": "umidade",
                "mensagem": f"Umidade alta ({ultima_leitura.umidade}%)"
            })

        if ultima_leitura.umidade < 12:
            alertas.append({
                "sensor": nome_sensor,
                "tipo": "umidade",
                "mensagem": f"Umidade baixa ({ultima_leitura.umidade}%)"
            })

    return {
        "total_alertas": len(alertas),
        "alertas": alertas
    }

@app.get("/api/admin/usuarios")
def listar_usuarios(admin_id: int, db: Session = Depends(get_db)):
    admin = db.query(User).filter(User.id == admin_id).first()

    if not admin or admin.role != "admin":
        raise HTTPException(403, "Acesso negado")

    usuarios = db.query(User).all()

    return [
        {
            "id": u.id,
            "username": u.username,
            "email": u.email,
            "role": u.role
        }
        for u in usuarios
    ]