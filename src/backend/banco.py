from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, create_engine, desc
from sqlalchemy.orm import sessionmaker, Session, declarative_base, relationship
from pydantic import BaseModel, Field
from passlib.context import CryptContext
from datetime import datetime
import pytz

ADMIN_SECRET_KEY = "$pbkdf2-sha256$29000$8/7f.58TIkTonZOydo4xhg$DAEhYqNr9TIRoABeC9jIW5T2T6jtTNGVvjH7WP8vak8"

engine = create_engine("sqlite:///./silotech.db", connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    leituras = relationship("Leitura", back_populates="dono")

class Leitura(Base):
    __tablename__ = "leituras"
    id = Column(Integer, primary_key=True, index=True)
    sensor_nome = Column(String, index=True) 
    temperatura = Column(Float)
    umidade = Column(Float)
    horario = Column(DateTime)
    owner_id = Column(Integer, ForeignKey("users.id"))
    
    dono = relationship("User", back_populates="leituras")

Base.metadata.create_all(bind=engine)

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3)
    email: str = Field(...)
    password: str = Field(..., min_length=8)
    admin_key: str 

class LoginRequest(BaseModel):
    email: str
    password: str

class LeituraCreate(BaseModel):
    sensor_nome: str
    temperatura: float
    umidade: float
    owner_id: int

app = FastAPI(title="SiloTech API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

@app.post("/cadastro", status_code=status.HTTP_201_CREATED)
def cadastro(request: UserCreate, db: Session = Depends(get_db)):
    if not pwd_context.verify(request.admin_key, ADMIN_SECRET_KEY):
        raise HTTPException(status_code=403, detail="Chave mestre inválida.")

    if db.query(User).filter(User.email == request.email).first():
        raise HTTPException(status_code=400, detail="E-mail já cadastrado.")

    novo_usuario = User(
        username=request.username,
        email=request.email,
        password=gerar_hash_senha(request.password)
    )
    
    try:
        db.add(novo_usuario)
        db.commit()
        return {"status": "sucesso", "message": "Conta criada com sucesso!"}
    except Exception:
        db.rollback()
        raise HTTPException(status_code=500, detail="Erro ao criar usuário.")

@app.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()

    if not user or not verificar_senha(request.password, user.password):
        raise HTTPException(status_code=401, detail="Credenciais incorretas.")

    return {
        "status": "sucesso",
        "message": f"Bem-vindo, {user.username}!",
        "username": user.username,
        "user_id": user.id 
    }

@app.post("/sensor/leitura") #gui10 usa esse para mandar as leituras para o db
def adicionar_leitura(request: LeituraCreate, db: Session = Depends(get_db)):
    if not db.query(User).filter(User.id == request.owner_id).first():
        raise HTTPException(status_code=404, detail="Usuário dono não encontrado.")

    nova_leitura = Leitura(
        sensor_nome=request.sensor_nome,
        temperatura=request.temperatura,
        umidade=request.umidade,
        owner_id=request.owner_id
    )
    
    try:
        db.add(nova_leitura)
        db.commit()

        leituras_antigas = db.query(Leitura).filter(
            Leitura.owner_id == request.owner_id,
            Leitura.sensor_nome == request.sensor_nome
        ).order_by(desc(Leitura.horario)).all()

        if len(leituras_antigas) > 12:
            for extra in leituras_antigas[12:]:
                db.delete(extra)
            db.commit()

        return {"status": "sucesso", "msg": f"Leitura registrada para {request.sensor_nome}"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/sensor/meu-historico/{usuario_id}")
def obter_historico_pessoal(usuario_id: int, sensor: str, db: Session = Depends(get_db)):
    dados = db.query(Leitura).filter(
        Leitura.owner_id == usuario_id,
        Leitura.sensor_nome == sensor
    ).order_by(desc(Leitura.horario)).limit(12).all()
    
    return dados

@app.get("/sensor/lista-sensores/{usuario_id}")
def listar_sensores_usuario(usuario_id: int, db: Session = Depends(get_db)):
    sensores = db.query(Leitura.sensor_nome).filter(
        Leitura.owner_id == usuario_id
    ).distinct().all()
    
    return [s[0] for s in sensores]