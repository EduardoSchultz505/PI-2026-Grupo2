#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>
#include <DHT.h>




#define DHTPIN 2       
#define DHTTYPE DHT11

const char* ssid = "Eduardo";       
const char* password = "senha123";  


const char* servidor = "https:
const int OWNER_ID = 2; 

DHT dht(DHTPIN, DHTTYPE);




void setup() {
  Serial.begin(115200);
  delay(1000);

  dht.begin();

  Serial.println("\n=================================");
  Serial.println("  SiloTech - ESP8266 + DHT11     ");
  Serial.println("=================================");

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  Serial.print("Conectando ao Hotspot");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWi-Fi Conectado com Sucesso!");
  Serial.print("IP da NodeMCU: ");
  Serial.println(WiFi.localIP());

  
  IPAddress dns(8, 8, 8, 8);
  IPAddress gateway = WiFi.gatewayIP();
  IPAddress subnet = WiFi.subnetMask();
  WiFi.config(WiFi.localIP(), gateway, subnet, dns);
  Serial.println("DNS (8.8.8.8) configurado para resolver a Vercel.");
}




void loop() {
  
  float temperatura = dht.readTemperature();
  float umidade = dht.readHumidity();

  if (isnan(temperatura) || isnan(umidade)) {
    Serial.println("Erro ao ler dados do sensor DHT11!");
    delay(5000);
    return;
  }

  Serial.println("\n---------------------------------");
  Serial.print("Temperatura: ");
  Serial.print(temperatura);
  Serial.println(" °C");
  Serial.print("Umidade: ");
  Serial.print(umidade);
  Serial.println(" %");

  
  if (WiFi.status() == WL_CONNECTED) {
    
    WiFiClientSecure client;
    
    
    client.setInsecure();            
    client.setTimeout(20000);        
    client.setBufferSizes(512, 512); 

    HTTPClient http;

    Serial.println("Enviando dados para o servidor...");

    if (http.begin(client, servidor)) {
      http.addHeader("Content-Type", "application/json");

      
      String json = "{";
      json += "\"sensor_nome\":\"DHT11\",";
      json += "\"temperatura\":" + String(temperatura, 2) + ",";
      json += "\"umidade\":" + String(umidade, 2) + ",";
      json += "\"owner_id\":" + String(OWNER_ID);
      json += "}";

      Serial.print("JSON: ");
      Serial.println(json);

      
      int codigoHTTP = http.POST(json);

      Serial.print("Código HTTP: ");
      Serial.println(codigoHTTP);

      if (codigoHTTP > 0) {
        String resposta = http.getString();
        Serial.print("Resposta da API: ");
        Serial.println(resposta);

        if (codigoHTTP >= 200 && codigoHTTP < 300) {
          Serial.println(">>> SUCESSO: Leitura gravada no banco de dados! <<<");
        }
      } else {
        Serial.print("Erro de conexão: ");
        Serial.println(http.errorToString(codigoHTTP));
      }

      http.end(); 
    } else {
      Serial.println("Não foi possível iniciar o cliente HTTP.");
    }
  } else {
    Serial.println("Erro: Wi-Fi Desconectado!");
  }

  Serial.println("Aguardando 30 segundos para o próximo ciclo...");
  delay(30000);
}