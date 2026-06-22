import requests

url = "http://127.0.0.1:8000/sensor/leitura"

dados = {
    "sensor_nome": "Sensor Milho",
    "temperatura": 13,
    "umidade": 11,
    "owner_id": 2
}

response = requests.post(url, json=dados)

print("Status:", response.status_code)
print("Resposta:", response.json())