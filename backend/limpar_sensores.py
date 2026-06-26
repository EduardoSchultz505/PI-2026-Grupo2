from sqlalchemy import create_engine, text
import os

arquivo = os.path.abspath("./silotech.db")

print("Banco usado:")
print(arquivo)

engine = create_engine(
    f"sqlite:///{arquivo}",
    connect_args={"check_same_thread": False}
)

with engine.connect() as conn:
    antes = conn.execute(
        text("SELECT COUNT(*) FROM leituras")
    ).scalar()

    print(f"Leituras antes: {antes}")


with engine.begin() as conn:
    conn.execute(text("DELETE FROM leituras"))


with engine.connect() as conn:
    depois = conn.execute(
        text("SELECT COUNT(*) FROM leituras")
    ).scalar()

    print(f"Leituras depois: {depois}")

print("Finalizado!")