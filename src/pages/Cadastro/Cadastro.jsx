import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cadastro.css';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, admin_key: adminKey }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userToken', 'logado');
        localStorage.setItem('userName', username);
        localStorage.setItem('userEmail', email);

        alert("Conta criada com sucesso!");
        navigate('/dashboard');
      } else {
        const errorMsg = Array.isArray(data.detail) ? data.detail[0].msg : data.detail;
        alert(`Erro: ${errorMsg || "Erro ao cadastrar"}`);
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
        <p>Painel Administrativo - Cadastro</p>

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
            <label htmlFor="password">Senha Pessoal</label>
            <input
              id="password"
              type="password"
              placeholder="Crie sua senha"
              value={password}
              minLength="8"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Chave Admin</label>
            <input
              id="adminKey"
              type="password"
              placeholder="Digite a chave de segurança"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="botao-login">Criar Conta</button>
        </form> 
      </div>
    </div>
  );
}