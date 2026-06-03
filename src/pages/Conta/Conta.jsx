import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  LuLayoutDashboard,
  LuSettings,
  LuLogOut,
  LuBell,
  LuShieldCheck,
  LuHardDrive,
  LuActivity,
  LuChevronRight,
} from "react-icons/lu";
import "./Conta.css";

function Conta() {
  const navigate = useNavigate();
  const [resumo, setResumo] = useState({
    totalSensores: 0,
    ultimaLeitura: "--",
  });
  const [alertas, setAlertas] = useState([]);

  const userName = localStorage.getItem("username");
  const userEmail = localStorage.getItem("email");
  const usuarioId = localStorage.getItem("user_id");

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const sensoresRes = await axios.get(
          `http://127.0.0.1:8000/sensor/lista-sensores/${usuarioId}`,
        );

        setResumo({
          totalSensores: sensoresRes.data.length,
          ultimaLeitura: new Date().toLocaleDateString(),
        });

        const alertasRes = await axios.get(
          `http://127.0.0.1:8000/sensor/alertas/${usuarioId}`,
        );

        setAlertas(alertasRes.data.alertas || []);
      } catch (e) {
        console.error("Erro ao carregar dados:", e);
      }
    };

    if (usuarioId) carregarDados();
  }, [usuarioId]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="conta-page-wrapper">
      <main className="conta-main-content">
        <div className="content-container-center">
          <header className="content-header">
            <h2>Minha Conta</h2>
            <p>Veja suas informações de sensores</p>
          </header>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <LuHardDrive size={24} />
              </div>
              <div>
                <span className="stat-value"> {resumo.totalSensores} </span>
                <span className="stat-label"> Sensores Ativos </span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <LuActivity size={24} />
              </div>
              <div>
                <span className="stat-value"> {alertas.length != 0 ? 'Alerta' : 'Estável' } </span>
                <span className="stat-label"> Status do Sistema </span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <LuBell size={24} />
              </div>
              <div>
                <span className="stat-value"> {alertas.length} </span>
                <span className="stat-label"> Alertas Críticos </span>
              </div>
            </div>
          </div>

          <section className="quick-actions">
            <h3>Suas Atividades</h3>
            <div className="action-list">
              <div
                className="action-item"
                onClick={() => navigate("/dashboard")}
              >
                <div className="action-info">
                  <h4>Análise de Gráficos</h4>
                  <p>
                    Verificar oscilações de umidade e temperatura em tempo real.
                  </p>
                </div>
                <LuChevronRight />
              </div>
            </div>
            <h3>Suas Notificações</h3>

            <div className="action-list">
              {alertas.length === 0 ? (
                <div className="action-item">
                  <div className="action-info">
                    <h4>Nenhum alerta</h4>
                    <p>Todos os sensores estão operando normalmente.</p>
                  </div>
                </div>
              ) : (
                alertas.map((alerta, index) => (
                  <div className="action-item" key={index}>
                    <div className="action-info">
                      <h4>{alerta.sensor}</h4>
                      <p>{alerta.mensagem}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
          <button className="sair" onClick={handleLogout}>
            <LuLogOut /> Sair
          </button>
        </div>
      </main>
    </div>
  );
}

export default Conta;
