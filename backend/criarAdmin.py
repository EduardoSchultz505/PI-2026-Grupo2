from banco import SessionLocal, User, gerar_hash_senha

db = SessionLocal()

admin = User(
    username="SiloTech",
    email="silotech@gmail.com",
    password=gerar_hash_senha("Silo123"),
    role="admin"
)

db.add(admin)
db.commit()

print("Admin criado com sucesso!")