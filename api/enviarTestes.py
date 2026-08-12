import argparse
import random
import sys
import requests

API_URL = "http://localhost:8000/api/sensor/leitura"


def enviar_leitura(sensor_nome: str, temperatura: float, umidade: float, owner_id: int):
    payload = {
        "sensor_nome": sensor_nome,
        "temperatura": temperatura,
        "umidade": umidade,
        "owner_id": owner_id,
    }

    print(f"Enviando para {API_URL}:")
    print(payload)

    try:
        response = requests.post(API_URL, json=payload, timeout=5)
    except requests.exceptions.ConnectionError:
        print("\n Não foi possível conectar à API.")
        print("Verifique se o backend está rodando em http://localhost:8000")
        sys.exit(1)

    print(f"\nStatus: {response.status_code}")
    try:
        print("Resposta:", response.json())
    except ValueError:
        print("Resposta (sem JSON):", response.text)


def valores_aleatorios():
    """Gera temperatura e umidade aleatórias, incluindo faixas normais e críticas."""
    temperatura = round(random.uniform(5, 30), 1)
    umidade = round(random.uniform(8, 20), 1)
    return temperatura, umidade


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Envia uma leitura falsa de sensor para a API do SiloTech.")
    parser.add_argument("--sensor", default="silo1", help="Nome do sensor (padrão: silo1)")
    parser.add_argument("--temperatura", type=float, default=None, help="Temperatura em °C (aleatória se omitido)")
    parser.add_argument("--umidade", type=float, default=None, help="Umidade em %% (aleatória se omitido)")
    parser.add_argument("--owner-id", type=int, default=2, help="ID do usuário dono do sensor (padrão: 1, o admin)")

    args = parser.parse_args()

    temperatura = args.temperatura
    umidade = args.umidade

    if temperatura is None or umidade is None:
        temp_aleatoria, umid_aleatoria = valores_aleatorios()
        temperatura = temperatura if temperatura is not None else temp_aleatoria
        umidade = umidade if umidade is not None else umid_aleatoria

    enviar_leitura(args.sensor, temperatura, umidade, args.owner_id)