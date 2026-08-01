#include "DHT.h"

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
    Serial.begin(9600);
    dht.begin();
}

void loop() {

    float umidade = dht.readHumidity();
    float temperatura = dht.readTemperature();

    if (!isnan(temperatura) && !isnan(umidade)) {

        Serial.print("{\"temperatura\":");
        Serial.print(temperatura,1);
        Serial.print(",\"umidade\":");
        Serial.print(umidade,1);
        Serial.println("}");
    }

    delay(5000);
}