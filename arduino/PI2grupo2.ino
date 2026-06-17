#include "DHT.h"

#define DHTPIN 2     
#define DHTTYPE DHT11   

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  Serial.println("--- Lendo Sensor DHT11 ---");
  dht.begin();
}

void loop() {
  delay(2000);

  float umidade = dht.readHumidity();
  float temperatura = dht.readTemperature();

  if (isnan(umidade) || isnan(temperatura)) {
    Serial.println("Erro: Falha ao ler o sensor DHT11. Verifique os fios!");
    return;
  }

  Serial.print("Umidade: ");
  Serial.print(umidade);
  Serial.print("%  |  ");
  Serial.print("Temperatura: ");
  Serial.print(temperatura);
  Serial.println("°C");
}
