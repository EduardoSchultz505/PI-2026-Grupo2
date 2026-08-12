# SiloTech — Monitoramento de Grãos com Hardware

Sistema web para monitoramento em tempo real de **temperatura** e **umidade** em silos de armazenamento de grãos, desenvolvido como Projeto Integrador II do **Instituto Federal Catarinense — Campus Concórdia**.

O projeto combina um sistema embarcado com uma API REST em Python e uma interface web em React, permitindo o acompanhamento remoto das condições de armazenamento e a emissão de alertas em situações críticas, contribuindo para a redução de perdas por umidade excessiva, variações de temperatura e proliferação de fungos.

---

##  Índice

- [Sobre o projeto](#-sobre-o-projeto)
- [Arquitetura](#-arquitetura)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Funcionalidades](#-funcionalidades)
- [Endpoints da API](#-endpoints-da-api)
- [Como rodar o projeto](#-como-rodar-o-projeto)
  - [Backend](#backend-api)
  - [Frontend](#frontend-web)
  - [Hardware](#hardware)
- [Estrutura do repositório](#-estrutura-do-repositório)
- [Equipe](#-equipe)
- [Orientadores](#-orientadores)
- [Licença](#-licença)

---

##  Sobre o projeto

Pequenos e médios produtores de grãos frequentemente monitoram as condições de armazenamento de forma manual, o que dificulta a identificação rápida de problemas e pode resultar em perdas de qualidade. O **SiloTech** propõe uma solução acessível de baixo custo, baseada em Internet das Coisas (IoT), para automatizar esse monitoramento.

O sistema coleta dados ambientais por meio de sensores conectados a um Esp8266, transmite essas informações via Wi-Fi para um backend em Python, armazena o histórico em banco de dados e disponibiliza tudo em um painel web, com geração automática de alertas quando os valores saem da faixa considerada segura.

##  Arquitetura

O sistema é dividido em cinco camadas:

| Camada | Responsabilidade |
|---|---|
| **Aquisição de dados** | Coleta de temperatura e umidade via sensor DHT11
| **Comunicação** | Transmissão dos dados via Wi-Fi com ESP8266 usando HTTP |
| **Processamento** | Recebimento, validação e regras de negócio, via API em Python (FastAPI) |
| **Armazenamento** | Persistência dos dados em banco SQLite |
| **Visualização e gerenciamento** | Interface web em React para monitoramento em tempo real |

```
[ DHT11 ] → [ ESP8266 / Wi-Fi ] → [ API FastAPI ] → [ SQLite ] → [ Frontend React ]
```

##  Tecnologias utilizadas

**Hardware / Embarcado**
- Sensor de temperatura e umidade DHT11
- Módulo Wi-Fi ESP8266
- Linguagem C/C++ (Arduino IDE)
- Bibliotecas: `DHT.h`, `ESP8266WiFi.h`, `ESP8266HTTPClient.h`

**Backend**
- Python 3
- FastAPI
- SQLAlchemy (ORM)
- SQLite (banco de dados)
- Passlib (hash de senhas)
- Uvicorn (servidor ASGI)

**Frontend**
- React
- Vite
- React Router DOM
- Recharts
- JavaScript / JSX / CSS

**Outros**
- Git / GitHub (versionamento)
- Metodologia ágil Scrum (organização em sprints)

##  Funcionalidades

- [x] Autenticação de usuários (login)
- [x] Cadastro de usuários (admin/usuário comum)
- [x] Registro de leituras de sensores (temperatura e umidade)
- [x] Histórico de leituras por sensor
- [x] Listagem de sensores vinculados a um usuário
- [x] Geração automática de alertas para condições críticas
- [x] Painel administrativo para gerenciamento de usuários

## 🔌 Endpoints da API

| Método | Endpoint | Função |
|---|---|---|
| `GET`  | `/api` | Verifica se a API está online |
| `POST` | `/api/cadastro` | Cadastra um novo usuário (requer `admin_id`) |
| `POST` | `/api/login` | Autentica um usuário |
| `POST` | `/api/sensor/leitura` | Registra uma nova leitura de temperatura/umidade |
| `GET`  | `/api/sensor/meu-historico/{usuario_id}` | Retorna o histórico de leituras de um sensor |
| `GET`  | `/api/sensor/lista-sensores/{usuario_id}` | Lista os sensores vinculados ao usuário |
| `GET`  | `/api/sensor/alertas/{usuario_id}` | Retorna alertas de condições críticas |
| `GET`  | `/api/admin/usuarios` | Lista todos os usuários (apenas admin) |

A documentação interativa (Swagger) fica disponível em `/docs` quando o backend está rodando.

##  Como rodar o projeto

### Backend (API)

```bash
cd api

# Criar e ativar ambiente virtual
python3 -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\Activate.ps1

# Instalar dependências
pip install -r requirements.txt

# Rodar o servidor
uvicorn main:app --reload --port 8000
```

A API sobe em `http://localhost:8000`. Na primeira execução, o banco `silotech.db` (SQLite) é criado automaticamente, junto com um usuário administrador padrão:

- **email:** `silotech@gmail.com`
- **senha:** `Silo123`

### Frontend (Web)

```bash
cd frontend

# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev
```

O frontend sobe em `http://localhost:5173` e consome a API do backend em `http://localhost:8000`.

### Hardware

1. Monte o circuito conectando o sensor DHT11 a uma porta digital com o Esp8266 (com resistor pull-up de 10kΩ).
2. Instale as bibliotecas necessárias: `DHT.h`, `ESP8266WiFi.h`, `ESP8266HTTPClient.h`.
3. Faça o upload do código para a placa. O dispositivo passará a enviar leituras periódicas para o endpoint `POST /api/sensor/leitura`.

## Estrutura do repositório

```
.
├── api/          # API em FastAPI + SQLite
├── src/          # Interface web em React (Vite)
├── firmware/     # Código embarcado (ESP8266)
└── README.md
```

##  Equipe

Projeto desenvolvido pelo Grupo 2 — Turma de Informática, IFC Campus Concórdia:

| Integrante | Área de atuação |
|---|---|
| Eduardo Schultz de Oliveira | Backend (API REST, integração com banco de dados) |
| Evelyn Maria Mafessoni Thomaz | Frontend (interface web) |
| Isabela Vitória Fracaro | Frontend (interface web) |
| Guilherme Otávio Riffel König | Firmware ESP8266, sensores e testes embarcados |
| Kaiky Vieira | Frontend (interface web) |
| Luiz Eduardo Ramisch Teixeira | Comunicação ESP8266 e testes de conectividade |
| Samuel Henrique Ramisch Teixeira | Testes de sistema e integração backend/frontend |

## Orientadores

- Prof. Heitor Scalco Neto
- Prof. Danimar Veriato

## Licença

Projeto acadêmico desenvolvido para fins educacionais no âmbito do Projeto Integrador II — IFC Campus Concórdia (2026).
