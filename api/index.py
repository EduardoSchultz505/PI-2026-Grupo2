"""
Script de teste — envia leituras FALSAS de temperatura/umidade para a API SiloTech.

Uso:
    python gerar_dados_teste.py

Configure as variáveis abaixo antes de rodar.
"""

import random
import time
import requests

# -----------------------------------------------------------------------------
# CONFIGURAÇÃO
# -----------------------------------------------------------------------------
BASE_URL = "https://seu-projeto.vercel.app"   # <-- troque pela URL do seu deploy
                                                #     (ou "http://127.0.0.1:8000" p/ teste local)

OWNER_ID = 1          # <-- id do usuário dono das leituras (ex: o admin criado no seed)
SENSORES = ["silo-01", "silo-02", "silo-03"]   # <-- nomes de sensores fictícios

QUANTIDADE_POR_SENSOR = 15   # quantas leituras enviar por sensor
INTERVALO_SEGUNDOS = 0.5     # pausa entre cada envio (evita martelar a API)

# Faixas de valores "realistas" para gerar dados aleatórios.
# Ajuste para forçar alertas (ex: TEMPERATURA acima de 20 ou abaixo de 10).
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