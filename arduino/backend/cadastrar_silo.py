import requests

API_URL = "http://127.0.0.1:8000"

# Ajuste estes dados conforme o usuário logado no Dashboard.
OWNER_ID = 6
SILO_NOME = "Silo Carlos 01"
DESCRICAO = "Silo cadastrado manualmente"

payload = {
    "nome": SILO_NOME,
    "owner_id": OWNER_ID,
    "descricao": DESCRICAO,
}

response = requests.post(f"{API_URL}/silos", json=payload, timeout=5)

print("Status:", response.status_code)
try:
    print("Resposta:", response.json())
except Exception:
    print(response.text)
