from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import sessionmaker, Session, declarative_base
from pydantic import BaseModel, EmailStr, Field

# --- CONFIGURAÇÃO DO BANCO DE DADOS ---
SQLALCHEMY_DATABASE_URL = "sqlite:///./silotech.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# --- MODELO DA TABELA ---
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String) # Novo campo adicionado
    email = Column(String, unique=True, index=True)
    password = Column(String)

# Cria o banco e as tabelas (se você mudou o modelo, delete o arquivo .db antigo)
Base.metadata.create_all(bind=engine)

# --- ESQUEMAS DE VALIDAÇÃO (PYDANTIC) ---
class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=20)
    email: str
    password: str = Field(..., min_length=8)

class LoginRequest(BaseModel):
    email: str
    password: str

# --- INICIALIZAÇÃO DO APP ---
app = FastAPI()

# Configuração do CORS (Ajustado para a porta padrão do Vite 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependência do Banco de Dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- ROTAS ---

@app.post("/cadastro")
def cadastro(request: UserCreate, db: Session = Depends(get_db)):
    # Verifica se o e-mail já existe
    db_user = db.query(User).filter(User.email == request.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="E-mail já cadastrado")

    novo_usuario = User(
        username=request.username,
        email=request.email,
        password=request.password
    )
    
    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)
    return {"status": "sucesso", "message": "Usuário criado!"}

@app.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    # Busca o usuário apenas por e-mail e senha
    user = db.query(User).filter(
        User.email == request.email, 
        User.password == request.password
    ).first()

    if not user:
        raise HTTPException(status_code=401, detail="E-mail ou senha incorretos")

    return {
        "status": "sucesso",
        "message": f"Bem-vindo, {user.username}!",
        "username": user.username
    }

# Rota auxiliar para ver todos os usuários (útil para teste)
@app.get("/usuarios")
def listar_usuarios(db: Session = Depends(get_db)):
    return db.query(User).all()