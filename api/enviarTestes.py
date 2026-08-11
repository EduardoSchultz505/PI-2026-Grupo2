import requests

url = "https://pi-2026-grupo2-git-main-eduardo-a1b9.vercel.app/api/sensor/leitura"

dados = {
    "sensor_nome": "Sensor Teste",
    "temperatura": 15.5,
    "umidade": 13.2,
    "owner_id": 2
}

try:
    response = requests.post(
        url,
        json=dados,
        timeout=10
    )

    print("Status:", response.status_code)
    print("Resposta:", response.json())

except requests.exceptions.RequestException as e:
    print("Erro na requisição:", e)
