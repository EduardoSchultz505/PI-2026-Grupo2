import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { LuLogOut } from "react-icons/lu";

export default function Admin() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState("tabela");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      alert("Acesso negado.");
      navigate("/conta");
      return;
    }

    carregarUsuarios();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const carregarUsuarios = async () => {
    try {
      setLoading(true);
      const adminId = localStorage.getItem("user_id");
      const response = await fetch(
        `http://127.0.0.1:8000/admin/usuarios?admin_id=${adminId}`,
      );
      const data = await response.json();

      if (response.ok) {
        setUsuarios(data);
      } else {
        alert(data.detail || "Erro ao carregar usuários.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  const enviarCadastro = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Erro ao cadastrar");
        return;
      }

      alert("Conta criada com sucesso!");

      setEmail("");
      setPassword("");
      setUsername("");
      setAbaAtiva("tabela");
      carregarUsuarios();
    } catch (error) {
      console.error("Erro na conexão:", error);
      alert("Não foi possível conectar ao servidor");
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Painel Administrativo</h1>
        <div className="admin-actions">
          {abaAtiva === "tabela" ? (
            <>
              <button
                className="botao-voltar"
                onClick={() => setAbaAtiva("cadastro")}
              >
                Adicionar Conta
              </button>
              <button className="sair" onClick={handleLogout}>
                <LuLogOut />
                <span>Sair</span>
              </button>
            </>
          ) : (
            <button
              className="botao-voltar"
              onClick={() => setAbaAtiva("tabela")}
            >
              Voltar para Lista
            </button>
          )}
        </div>
      </div>

      {abaAtiva === "tabela" ? (
        loading ? (
          <p className="loading-text">Carregando usuários...</p>
        ) : (
          <div className="tabela-wrapper">
            <table className="tabela-usuarios">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.username}</td>
                    <td>{usuario.email}</td>
                    <td>
                      <span className={`role-badge ${usuario.role}`}>
                        {usuario.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div className="login-container" style={{ marginTop: "20px" }}>
          <div className="login">
            <h2>SiloTech</h2>
            <p>Cadastro de Usuário</p>

            <form className="login-form" onSubmit={enviarCadastro}>
              <div>
                <label>E-mail</label>
                <input
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label>Nome de Usuário</label>
                <input
                  type="text"
                  placeholder="Digite seu nome"
                  value={username}
                  minLength={3}
                  maxLength={20}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div>
                <label>Senha</label>
                <input
                  type="password"
                  placeholder="Crie sua senha"
                  value={password}
                  minLength={8}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="botao-login">
                Criar Conta
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
