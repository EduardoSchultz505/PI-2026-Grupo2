import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  LuLogOut,
  LuBell,
  LuHardDrive,
  LuActivity,
  LuChevronRight,
} from "react-icons/lu";

import "./Conta.css";

function Monitoramento() {
  const navigate = useNavigate();
  const usuarioId = localStorage.getItem("user_id");
  const [loading, setLoading] = useState(true);
  const [resumo, setResumo] = useState({totalSensores: 0,});
  const [alertas, setAlertas] = useState([]);
  const [sensores, setSensores] = useState([]);
  const [leituras, setLeituras] = useState({});

  const buscarHistorico = useCallback(
    async (sensor) => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/sensor/meu-historico/${usuarioId}?sensor=${sensor}`,
        );

        setLeituras((prev) => ({
          ...prev,
          [sensor]: response.data,
        }));
      } catch (error) {
        console.error(error);
      }
    },
    [usuarioId],
  );
  const carregarDados = useCallback(async () => {
    try {
      const sensoresRes = await axios.get(
        `http://127.0.0.1:8000/sensor/lista-sensores/${usuarioId}`,
      );

      const listaSensores = sensoresRes.data;

      setSensores(listaSensores);

      setResumo({totalSensores: listaSensores.length,});

      for (const sensor of listaSensores) {
        buscarHistorico(sensor);
      }

      const alertasRes = await axios.get(
        `http://127.0.0.1:8000/sensor/alertas/${usuarioId}`,
      );

      setAlertas(alertasRes.data.alertas || []);

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [usuarioId, buscarHistorico]);

  useEffect(() => {
    if (!usuarioId) return;

    const timeout = setTimeout(() => {
      carregarDados();
    }, 0);

    const interval = setInterval(() => {
      carregarDados();
    }, 5000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [usuarioId, carregarDados]);

  const ultimaLeituraGlobal = Object.values(leituras)
    .flat()
    .sort((a, b) => new Date(b.horario) - new Date(a.horario))[0];

  const statusSistema =
    alertas.length > 0 ? "Crítico" : sensores.length > 0 ? "Online" : "Offline";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!usuarioId) {
    return <h2 className="loading-text">Faça login para ver seus dados.</h2>;
  }
  if (loading) {
    return <div className="loading">Carregando dados...</div>;
  }

  return (
    <div className="conta-page-wrapper">
        <div className="content-container-center">
          <header className="content-header">
            <h2>Minha Conta</h2>
            <p>Veja suas informações e sensores em tempo real</p>
          </header>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <LuHardDrive size={24} />
              </div>

              <div>
                <span className="stat-value">{resumo.totalSensores}</span>

                <span className="stat-label">Sensores Ativos</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon"><LuActivity size={24} /></div>

              <div>
                <span className="stat-value">{statusSistema}</span>
                <span className="stat-label">Status do Sistema</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon"><LuBell size={24} /></div>
              <div>
                <span className="stat-value">{alertas.length}</span>
                <span className="stat-label">Alertas Críticos</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon"><LuActivity size={24} /></div>

              <div>
                <span className="stat-value">
                  {ultimaLeituraGlobal ? new Date(ultimaLeituraGlobal.horario).toLocaleTimeString() : "--:--"}
                </span>

                <span className="stat-label">Última Leitura</span>
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
                    Verificar oscilações de temperatura e umidade em tempo real.
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
                      <h4>{alerta.sensor.replace("_", " ")}</h4>

                      <p>{alerta.mensagem}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <h3>Sensores em Tempo Real</h3>

            <div className="action-list">
              {sensores.length === 0 ? (
                <div className="action-item">
                  <div className="action-info">
                    <h4>Nenhum sensor encontrado</h4>

                    <p>Você ainda não possui sensores cadastrados.</p>
                  </div>
                </div>
              ) : (
                sensores.map((sensor) => {
                  const historico = leituras[sensor] || [];

                  const ultima = historico[0];

                  return (
                    <div
                      className="action-item"
                      key={sensor}
                      onClick={() => navigate("/dashboard")}
                    >
                      <div className="action-info">
                        <h4>{sensor}</h4>

                        {ultima ? (
                          <>
                            <p>
                              Temperatura: {ultima.temperatura.toFixed(1)}
                              °C
                            </p>

                            <p>Umidade: {ultima.umidade.toFixed(1)}%</p>

                            <small>
                              Última leitura:
                              <br />
                              {new Date(ultima.horario).toLocaleString()}
                            </small>

                            {historico.length > 1 && (
                              <>
                                <hr />

                                <strong>Histórico recente</strong>

                                <div className="historico">
                                  {historico.slice(0, 5).map((item) => (
                                    <div
                                      className="historico-item"
                                      key={item.id}
                                    >
                                      <span>
                                        Temperatura{" "}
                                        {item.temperatura.toFixed(1)}
                                        °C
                                      </span>

                                      <span>
                                        Umidade {item.umidade.toFixed(1)}%
                                      </span>

                                      <small>
                                        {new Date(
                                          item.horario,
                                        ).toLocaleTimeString()}
                                      </small>
                                    </div>
                                  ))}
                                </div>
                              </>
                            )}
                          </>
                        ) : (
                          <p>Sem leituras disponíveis.</p>
                        )}
                      </div>
                      <LuChevronRight />
                    </div>
                  );
                })
              )}
            </div>
          </section>
          <div className="conta-footer">
            <button className="sair" onClick={handleLogout}>
              <LuLogOut />
              <span>Sair</span>
            </button>
          </div>
        </div>
    </div>
  );
}

export default Monitoramento;
