import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // Sem username aqui!
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Sucesso: ${data.message}`);
        console.log("Token recebido:", data.user_email);
        // Aqui você poderia usar o useNavigate() para ir para a Home
      } else {
        // Pega a mensagem de erro vinda do Python (detail)
        alert(`Erro: ${data.detail || "Falha no login"}`);
      }
    } catch (error) {
      console.error("Erro na conexão:", error);
      alert("Não foi possível conectar ao servidor Python.");
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <h1>SiloTech</h1>
        <p>Bem-vindo de volta!</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Digite o seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Digite a sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="botao-login">
            Entrar
          </button>
        </form>

        <a href="/" className="esqueceu-senha">
          Esqueceu sua senha?
        </a>
      </div>
    </div>
  );
}
