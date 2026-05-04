# SiloTech - Sistema de Monitoramento e Gestão

O **SiloTech** é uma plataforma full-stack desenvolvida para o monitoramento inteligente de silos. O sistema permite o cadastro de usuários com validação administrativa, autenticação segura e a visualização de dados críticos coletados por sensores em tempo real.

## Tecnologias Utilizadas

### Frontend
*   **React.js**: Biblioteca para construção da interface de usuário.
*   **Vite**: Ferramenta de build rápida para o frontend.
*   **React Router Dom**: Gerenciamento de rotas, navegação e tratamento de erro 404.
*   **CSS3**: Estilização personalizada e responsiva.

### Backend
*   **FastAPI**: Framework Python de alta performance para a criação da API.
*   **SQLAlchemy**: ORM para comunicação com o banco de dados.
*   **Passlib**: Biblioteca para criptografia e segurança de senhas.
*   **Pydantic**: Validação de dados e esquemas.
*   **Uvicorn**: Servidor ASGI para rodar a aplicação.

### Banco de Dados
*   **SQLite**: Banco de dados relacional leve, armazenado em arquivo local (`silotech.db`).

### Hardware
*   **Arduino**: Recebe os pulsos digitais do sensor e os converte em variáveis de ponto flutuante (float) para temperatura e umidade.
*   **DHT11**: Realiza a leitura de temperatura e umidade da massa de ar dentro do silo.

---

## Estrutura do Projeto

*   **Páginas Públicas**: Home, Sobre o Projeto (Impacto Agronômico), Tecnologias, Contato, Login e Cadastro.
*   **Páginas Privadas**: Dashboard de Monitoramento, Histórico de Dados e Configurações do Silo.
*   **Segurança**: O cadastro de novos usuários exige uma **Chave de Mestre** para garantir que apenas pessoas autorizadas pelo instalador acessem o sistema.

---

## Como rodar o projeto

### 1. Pré-requisitos
*   Node.js instalado.
*   Python 3.10 ou superior instalado.

### 2. Configurando o Backend
Navegue até a pasta do backend e instale as dependências:
```bash
pip install fastapi uvicorn sqlalchemy passlib[bcrypt]
```
Após instalar as dependências, inicie o servidor com o comando:
```bash
python -m uvicorn banco:app --reload
```

### 3. Configurando o Frontend
Abra um novo terminal (mantenha o do Python rodando) e navegue até a pasta do seu projeto React:
```bash
cd caminho/para/seu/projeto-frontend
```
Instale as dependências do Node:
```bash
npm install
```
Inicie o servidor de desenvolvimento do Vite:
```bash
npm run dev
```
O terminal informará um endereço (http://localhost:5173). Abra este link no seu navegador.