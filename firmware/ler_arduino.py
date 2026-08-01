<<<<<<< HEAD
"""
1.python -m uvicorn banco:app --reload
2. Grave o .ino no Arduino e deixe conectado por USB
3. Ajuste SERIAL_PORT, OWNER_ID e SENSOR_NOME
"""


>>>>>>> b44db15a80529ce9d116ef05beecd78587b962dd
import json
import sys
import time

import requests
import serial

<<<<<<< HEAD
SERIAL_PORT = "COM3"
BAUD_RATE = 9600
API_URL = "http://127.0.0.1:8000/sensor/leitura"
SENSOR_NOME = "Silo Carlos 01"
OWNER_ID = 6  


=======
SERIAL_PORT = "COM3"
BAUD_RATE = 9600
API_URL = "http://127.0.0.1:8000"
SENSOR_NOME = "Silo Carlos 01"
OWNER_ID = 6


def verificar_api() -> None:
    try:
        response = requests.get(f"{API_URL}/", timeout=5)
        response.raise_for_status()
        print(f"API online: {response.json()}")
    except requests.RequestException as exc:
        print(f"Não foi possível acessar a API em {API_URL}: {exc}")
        print("Confira se você iniciou o backend com: python -m uvicorn banco:app --reload")
        sys.exit(1)


def cadastrar_silo_se_necessario() -> None:
    payload = {
        "nome": SENSOR_NOME,
        "owner_id": OWNER_ID,
        "descricao": "Silo cadastrado pelo script ler_arduino.py",
    }

    try:
        response = requests.post(f"{API_URL}/silos", json=payload, timeout=5)
        if response.status_code == 400 and "já" in response.text:
            print(f"Silo '{SENSOR_NOME}' já estava cadastrado para owner_id={OWNER_ID}.")
            return
        response.raise_for_status()
        print(f"Silo cadastrado: {response.json().get('silo', {}).get('nome', SENSOR_NOME)}")
    except requests.RequestException as exc:
        print(f"Erro ao cadastrar/verificar silo na API: {exc}")
        print("Se aparecer 404, confira se OWNER_ID é o mesmo user_id do login no Dashboard.")
        sys.exit(1)

>>>>>>> b44db15a80529ce9d116ef05beecd78587b962dd

def enviar_leitura(temperatura: float, umidade: float) -> bool:
    payload = {
        "sensor_nome": SENSOR_NOME,
        "temperatura": temperatura,
        "umidade": umidade,
        "owner_id": OWNER_ID,
    }

    try:
<<<<<<< HEAD
        response = requests.post(API_URL, json=payload, timeout=5)
=======
        response = requests.post(f"{API_URL}/sensor/leitura", json=payload, timeout=5)
>>>>>>> b44db15a80529ce9d116ef05beecd78587b962dd
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

<<<<<<< HEAD
=======
    verificar_api()
    cadastrar_silo_se_necessario()

>>>>>>> b44db15a80529ce9d116ef05beecd78587b962dd
    try:
        ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=2)
    except serial.SerialException as exc:
        print(f"Não foi possível abrir a porta serial: {exc}")
<<<<<<< HEAD
        print("Dica: feche o Monitor Serial do Arduino IDE antes de rodar este script.")
=======
        print("Dicas:")
        print("- Feche o Monitor Serial do Arduino IDE antes de rodar este script.")
        print("- Confira se SERIAL_PORT está correto: COM3/COM4 no Windows, /dev/ttyACM0 ou /dev/ttyUSB0 no Linux.")
>>>>>>> b44db15a80529ce9d116ef05beecd78587b962dd
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
