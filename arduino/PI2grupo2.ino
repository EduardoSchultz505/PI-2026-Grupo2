#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  float temp = dht.readTemperature();
  float umid = dht.readHumidity();

  Serial.print("Temperatura: ");
  Serial.print(temp);
  Serial.print("°C  |  Umidade: ");
  Serial.print(umid);
  Serial.println("%");

  delay(2000);
}