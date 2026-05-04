import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem("userToken");
    if (loggedUser) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userName", data.username);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userToken", "token-gerado-ou-fixo");

        alert(`Sucesso: ${data.message}`);
        navigate("/dashboard");
      } else {
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
              autoComplete="username"
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
              autoComplete="current-password"
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
