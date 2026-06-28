"""
1.python -m uvicorn banco:app --reload
2. Grave o .ino no Arduino e deixe conectado por USB
3. Ajuste SERIAL_PORT, OWNER_ID e SENSOR_NOME
"""

import json
import sys
import time

import requests
import serial

SERIAL_PORT = "COM3"
BAUD_RATE = 9600
API_URL = "http://127.0.0.1:8000/sensor/leitura"
SENSOR_NOME = "Silo Carlos 01"
OWNER_ID = 6  



def enviar_leitura(temperatura: float, umidade: float) -> bool:
    payload = {
        "sensor_nome": SENSOR_NOME,
        "temperatura": temperatura,
        "umidade": umidade,
        "owner_id": OWNER_ID,
    }

    try:
        response = requests.post(API_URL, json=payload, timeout=5)
        response.raise_for_status()
        print(f"OK -> temp={temperatura}°C, umid={umidade}% | {response.json().get('msg', '')}")
        return True
    except requests.RequestException as exc:
        print(f"Erro ao enviar para API: {exc}")
        return False


def main() -> None:
    print(f"Conectando em {SERIAL_PORT} ({BAUD_RATE} baud)...")
    print(f"Enviando para {API_URL} como owner_id={OWNER_ID}, sensor='{SENSOR_NOME}'")
    print("Pressione Ctrl+C para parar.\n")

    try:
        ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=2)
    except serial.SerialException as exc:
        print(f"Não foi possível abrir a porta serial: {exc}")
        print("Dica: feche o Monitor Serial do Arduino IDE antes de rodar este script.")
        sys.exit(1)

    time.sleep(2)

    try:
        while True:
            linha = ser.readline().decode("utf-8", errors="ignore").strip()
            if not linha:
                continue

            try:
                dados = json.loads(linha)
            except json.JSONDecodeError:
                print(f"Ignorando linha inválida: {linha}")
                continue

            if "erro" in dados:
                print(f"Arduino reportou erro: {dados['erro']}")
                continue

            temperatura = dados.get("temperatura")
            umidade = dados.get("umidade")

            if temperatura is None or umidade is None:
                print(f"JSON incompleto: {dados}")
                continue

            enviar_leitura(float(temperatura), float(umidade))

    except KeyboardInterrupt:
        print("\nEncerrado pelo usuário.")
    finally:
        ser.close()


if __name__ == "__main__":
    main()
