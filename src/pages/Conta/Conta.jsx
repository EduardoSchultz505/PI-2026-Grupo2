import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
// Importando corretamente da biblioteca Lucide dentro do pacote react-icons
import { 
  LuLayoutDashboard, LuSettings, LuLogOut, LuBell, 
  LuShieldCheck, LuHardDrive, LuActivity, LuChevronRight 
} from "react-icons/lu";
import "./Conta.css";

const Conta = () => {
  const navigate = useNavigate();
  const [resumo, setResumo] = useState({ totalSensores: 0, ultimaLeitura: "--" });

  // Garantindo que os nomes batam com o que foi salvo no Login
  const userName = localStorage.getItem("username") || "Usuário";
  const userEmail = localStorage.getItem("email") || "perfil@silotech.com";
  const usuarioId = localStorage.getItem("user_id");

  useEffect(() => {
    const carregarResumo = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/sensor/lista-sensores/${usuarioId}`);
        setResumo({
          totalSensores: res.data.length,
          ultimaLeitura: new Date().toLocaleDateString()
        });
      } catch (e) { 
        console.error("Erro ao carregar sensores:", e); 
      }
    };
    if (usuarioId) carregarResumo();
  }, [usuarioId]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="conta-page-wrapper">
      {/* ESQUERDA: Perfil do Usuário */}
      <aside className="conta-sidebar">
        <div className="perfil-section">
          <div className="avatar-grande">
            {userName.charAt(0).toUpperCase()}
          </div>
          <h3>{userName}</h3>
          <span className="email-sub">{userEmail}</span>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-link active">
            <LuLayoutDashboard size={20} /> Painel Geral
          </Link>
          <button className="nav-link"><LuBell size={20} /> Notificações</button>
          <button className="nav-link"><LuShieldCheck size={20} /> Segurança</button>
          <button className="nav-link"><LuSettings size={20} /> Configurações</button>
          
          <button className="nav-link logout-btn" onClick={handleLogout}>
            <LuLogOut size={20} /> Sair
          </button>
        </nav>
      </aside>

      {/* CENTRO: Outras Informações */}
      <main className="conta-main-content">
        <div className="content-container-center">
          <header className="content-header">
            <h2>Minha Conta</h2>
            <p>Visão geral do seu sistema de monitoramento</p>
          </header>

          {/* Cards de Estatísticas */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon blue"><LuHardDrive size={24} /></div>
              <div className="stat-data">
                <span className="stat-value">{resumo.totalSensores}</span>
                <span className="stat-label">Sensores Ativos</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green"><LuActivity size={24} /></div>
              <div className="stat-data">
                <span className="stat-value">Estável</span>
                <span className="stat-label">Status do Sistema</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon orange"><LuBell size={24} /></div>
              <div className="stat-data">
                <span className="stat-value">0</span>
                <span className="stat-label">Alertas Críticos</span>
              </div>
            </div>
          </div>

          {/* Seção de Atalhos Rápidos */}
          <section className="quick-actions">
            <h3>Acesso Rápido</h3>
            <div className="action-list">
              <div className="action-item" onClick={() => navigate("/dashboard")}>
                <div className="action-info">
                  <h4>Análise de Gráficos</h4>
                  <p>Verificar oscilações de umidade e temperatura em tempo real.</p>
                </div>
                <LuChevronRight size={20} />
              </div>

              <div className="action-item">
                <div className="action-info">
                  <h4>Relatório de Safra</h4>
                  <p>Exportar histórico de armazenamento e qualidade em PDF.</p>
                </div>
                <LuChevronRight size={20} />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Conta;