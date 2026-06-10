import requests

url = "http://127.0.0.1:8000/sensor/leitura"

dados = {
    "sensor_nome": "Lindóia do Sul",
    "temperatura": 13.0,
    "umidade": 10.5,
    "owner_id": 6
}

response = requests.post(url, json=dados)

print("Status:", response.status_code)
print("Resposta:", response.json())