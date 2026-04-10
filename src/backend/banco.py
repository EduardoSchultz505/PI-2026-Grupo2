import sqlite3
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
db_dir = os.path.join(BASE_DIR, "db")
os.makedirs(db_dir, exist_ok=True)

db_path = os.path.join(db_dir, "meu_banco.db")

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    senha TEXT NOT NULL
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS leituras (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    temperatura REAL,
    umidade REAL,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP
)
""")

def usuario_existe(nome, email):
    cursor.execute("""
    SELECT 1 FROM usuarios
    WHERE nome = ? OR email = ?
    """, (nome, email))

    return cursor.fetchone() is not None


def inserir_usuario(nome, email, senha):
    if usuario_existe(nome, email):
        print(f"Usuário {nome} ou email {email} já existe.")
        return

    cursor.execute("""
    INSERT INTO usuarios (nome, email, senha)
    VALUES (?, ?, ?)
    """, (nome, email, senha))

    conn.commit()
    print(f"Usuário {nome} inserido com sucesso!")

def salvar_leitura(temperatura, umidade):
    cursor.execute("""
    INSERT INTO leituras (temperatura, umidade)
    VALUES (?, ?)
    """, (temperatura, umidade))

    conn.commit()
    print(f"Leitura salva: {temperatura}°C | {umidade}%")


def pegar_ultima_leitura():
    cursor.execute("""
    SELECT * FROM leituras
    ORDER BY id DESC
    LIMIT 1
    """)

    return cursor.fetchone()

inserir_usuario("João", "joao@email.com", "123456")
inserir_usuario("Maria", "maria@email.com", "abc123")

salvar_leitura(28.5, 60.2)
salvar_leitura(29.1, 58.7)

cursor.execute("SELECT * FROM usuarios")
usuarios = cursor.fetchall()

print("\nUsuários cadastrados:")
for u in usuarios:
    print(u)

print("\nÚltima leitura do sensor:")
print(pegar_ultima_leitura())

conn.close()