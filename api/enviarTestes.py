import random
import time
import requests

BASE_URL = "https://pi-2026-grupo2.vercel.app/"

OWNER_ID = 2         
SENSORES = ["Silo Milho 1"]   

QUANTIDADE_POR_SENSOR = 90
INTERVALO_SEGUNDOS = 5 



TEMPERATURA_MIN, TEMPERATURA_MAX = 8.0, 24.0
UMIDADE_MIN, UMIDADE_MAX = 10.0, 16.0


def gerar_leitura_falsa(sensor_nome: str) -> dict:
    return {
        "sensor_nome": sensor_nome,
        "temperatura": round(random.uniform(TEMPERATURA_MIN, TEMPERATURA_MAX), 1),
        "umidade": round(random.uniform(UMIDADE_MIN, UMIDADE_MAX), 1),
        "owner_id": OWNER_ID,
    }


def enviar_leitura(leitura: dict) -> None:
    url = f"{BASE_URL}/api/sensor/leitura"
    try:
        resposta = requests.post(url, json=leitura, timeout=10)
        if resposta.status_code == 200:
            print(f"[OK] {leitura['sensor_nome']} -> temp={leitura['temperatura']}°C "
                  f"umid={leitura['umidade']}%")
        else:
            print(f"[ERRO {resposta.status_code}] {leitura} -> {resposta.text}")
    except requests.exceptions.RequestException as e:
        print(f"[FALHA DE CONEXÃO] {e}")


def main():
    print(f"Enviando dados de teste para: {BASE_URL}")
    print(f"Sensores: {', '.join(SENSORES)}")
    print(f"Total de leituras: {QUANTIDADE_POR_SENSOR * len(SENSORES)}\n")

    for i in range(QUANTIDADE_POR_SENSOR):
        for sensor in SENSORES:
            leitura = gerar_leitura_falsa(sensor)
            enviar_leitura(leitura)
            time.sleep(INTERVALO_SEGUNDOS)

    print("\nConcluído. Verifique os endpoints:")
    print(f"  {BASE_URL}/api/sensor/meu-historico/{OWNER_ID}?sensor={SENSORES[0]}")
    print(f"  {BASE_URL}/api/sensor/alertas/{OWNER_ID}")


if __name__ == "__main__":
    main()