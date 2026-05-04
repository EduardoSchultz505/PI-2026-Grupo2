from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import sessionmaker, Session, declarative_base
from pydantic import BaseModel, Field
from passlib.context import CryptContext

ADMIN_SECRET_KEY = "admin123" #preciso mudar essa senha, talvez criptografar tambem

SQLALCHEMY_DATABASE_URL = "sqlite:///./silotech.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)

Base.metadata.create_all(bind=engine)

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=20)
    email: str
    password: str = Field(..., min_length=8)
    admin_key: str 

class LoginRequest(BaseModel):
    email: str
    password: str

app = FastAPI()

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

def gerar_hash_senha(password: str):
    return pwd_context.hash(password)

def verificar_senha(senha_digitada, senha_criptografada):
    return pwd_context.verify(senha_digitada, senha_criptografada)

@app.post("/cadastro")
def cadastro(request: UserCreate, db: Session = Depends(get_db)):
    if request.admin_key != ADMIN_SECRET_KEY:
        raise HTTPException(status_code=403, detail="Chave de Mestre incorreta. Acesso negado.")

    db_user = db.query(User).filter(User.email == request.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="E-mail já cadastrado")

    novo_usuario = User(
        username=request.username,
        email=request.email,
        password=gerar_hash_senha(request.password)
    )
    
    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)
    return {"status": "sucesso", "message": "Conta criada!"}

@app.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()

    if not user or not verificar_senha(request.password, user.password):
        raise HTTPException(status_code=401, detail="E-mail ou senha incorretos")

    return {
        "status": "sucesso",
        "message": f"Bem-vindo, {user.username}!",
        "username": user.username
    }

@app.get("/usuarios")
def listar_usuarios(db: Session = Depends(get_db)):
    return db.query(User).all()