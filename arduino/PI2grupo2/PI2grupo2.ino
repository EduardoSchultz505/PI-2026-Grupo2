#include "DHT.h"

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  delay(60000);

  float umidade = dht.readHumidity();
  float temperatura = dht.readTemperature();

  if (isnan(umidade) || isnan(temperatura)) {
    Serial.println("{\"erro\":\"falha_leitura_dht11\"}");
    return;
  }

  Serial.print("{\"temperatura\":");
  Serial.print(temperatura, 1);
  Serial.print(",\"umidade\":");
  Serial.print(umidade, 1);
  Serial.println("}");
}
