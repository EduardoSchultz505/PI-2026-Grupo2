import requests

url = "https://pi-2026-grupo2-git-main-eduardo-a1b9.vercel.app/api/sensor/leitura"

dados = {
    "sensor_nome": "Sensor Teste",
    "temperatura": 15.5,
    "umidade": 13.2,
    "owner_id": 2
}

response = requests.post(url, json=dados)

print("Status:", response.status_code)
print("Resposta:", response.json())