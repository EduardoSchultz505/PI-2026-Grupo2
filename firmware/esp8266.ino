#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>
#include <DHT.h>

// -----------------------------------------------------------------------------
// CONFIGURAÇÕES DO HARDWARE E DA REDE
// -----------------------------------------------------------------------------
#define DHTPIN 2       // Pino D4 na NodeMCU
#define DHTTYPE DHT11

const char* ssid = "Eduardo";       // Nome do seu Hotspot
const char* password = "senha123";  // Senha do seu Hotspot

// Rota da API com barra '/' no final para evitar redirecionamento
const char* servidor = "https://pi-2026-grupo2.vercel.app/api/sensor/leitura/";
const int OWNER_ID = 2; // ID do usuário existente no banco de dados

DHT dht(DHTPIN, DHTTYPE);

// -----------------------------------------------------------------------------
// SETUP (Executado apenas uma vez ao ligar)
// -----------------------------------------------------------------------------
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

  // DNS do Google (8.8.8.8) - Imprescindível para contornar limitações do Hotspot
  IPAddress dns(8, 8, 8, 8);
  IPAddress gateway = WiFi.gatewayIP();
  IPAddress subnet = WiFi.subnetMask();
  WiFi.config(WiFi.localIP(), gateway, subnet, dns);
  Serial.println("DNS (8.8.8.8) configurado para resolver a Vercel.");
}

// -----------------------------------------------------------------------------
// LOOP (Executado continuamente)
// -----------------------------------------------------------------------------
void loop() {
  // 1. Leitura do Sensor
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

  // 2. Envio via HTTPS
  if (WiFi.status() == WL_CONNECTED) {
    // Instanciação em escopo local para liberar RAM a cada ciclo
    WiFiClientSecure client;
    
    // Configurações para estabilidade em redes de celular
    client.setInsecure();            // Salta a validação do certificado raiz
    client.setTimeout(20000);        // Timeout tolerante de 20s para conexões 4G/5G
    client.setBufferSizes(512, 512); // Limita tamanho de buffers SSL para poupar memória

    HTTPClient http;

    Serial.println("Enviando dados para o servidor...");

    if (http.begin(client, servidor)) {
      http.addHeader("Content-Type", "application/json");

      // Montagem da estrutura JSON exigida pelo schema FastAPI
      String json = "{";
      json += "\"sensor_nome\":\"DHT11\",";
      json += "\"temperatura\":" + String(temperatura, 2) + ",";
      json += "\"umidade\":" + String(umidade, 2) + ",";
      json += "\"owner_id\":" + String(OWNER_ID);
      json += "}";

      Serial.print("JSON: ");
      Serial.println(json);

      // Disparo do POST
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

      http.end(); // Libera os recursos HTTP
    } else {
      Serial.println("Não foi possível iniciar o cliente HTTP.");
    }
  } else {
    Serial.println("Erro: Wi-Fi Desconectado!");
  }

  Serial.println("Aguardando 30 segundos para o próximo ciclo...");
  delay(30000);
}