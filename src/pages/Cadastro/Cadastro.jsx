import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cadastro.css';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/cadastro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        alert(data.detail || "Erro ao cadastrar usuário.");
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
        <p>Cadastre sua Conta</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div>
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

          <div>
            <label htmlFor="user">Nome de Usuário</label>
            <input
              id="user"
              type="text"
              placeholder="Digite seu nome de usuário"
              value={username}
              minLength="3"
              maxLength="20"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Crie uma senha"
              value={password}
              minLength="8"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="botao-login">Cadastrar</button>
        </form>

        <p className="esqueceu-senha">
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </p>
      </div>
    </div>
  );
}

