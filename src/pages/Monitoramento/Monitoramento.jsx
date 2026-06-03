import React, { useEffect, useState } from "react";
import "./Monitoramento.css";

const API_URL = "http://localhost:8000";

export default function MonitorSensores() {
  const [sensores, setSensores] = useState([]);
  const [leituras, setLeituras] = useState({});
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("user_id");

  async function carregarSensores() {
    try {
      const response = await fetch(
        `${API_URL}/sensor/lista-sensores/${userId}`
      );

      const data = await response.json();

      setSensores(data);

      for (const sensor of data) {
        buscarHistorico(sensor);
      }

      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar sensores:", error);
    }
  }

  async function buscarHistorico(sensor) {
    try {
      const response = await fetch(
        `${API_URL}/sensor/meu-historico/${userId}?sensor=${sensor}`
      );

      const data = await response.json();

      setLeituras((prev) => ({
        ...prev,
        [sensor]: data,
      }));
    } catch (error) {
      console.error(`Erro no sensor ${sensor}:`, error);
    }
  }

  useEffect(() => {
    carregarSensores();

    const interval = setInterval(() => {
      carregarSensores();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="loading">
        Carregando sensores...
      </div>
    );
  }

  return (
    <div className="monitor-container">
      <h1 className="titulo">
        Monitoramento de Sensores
      </h1>

      <div className="grid-sensores">
        {sensores.map((sensor) => {
          const historico = leituras[sensor] || [];
          const ultima = historico[0];

          return (
            <div className="card-sensor" key={sensor}>
              <h2 className="sensor-nome">
                {sensor}
              </h2>

              {ultima ? (
                <>
                  <div className="info">
                    <span>🌡 Temperatura</span>

                    <span className="valor temperatura">
                      {ultima.temperatura.toFixed(1)}°C
                    </span>
                  </div>

                  <div className="info">
                    <span>💧 Umidade</span>

                    <span className="valor umidade">
                      {ultima.umidade.toFixed(1)}%
                    </span>
                  </div>

                  <div className="horario">
                    Última leitura:
                    <br />
                    {new Date(
                      ultima.horario
                    ).toLocaleString()}
                  </div>

                  <hr />

                  <h3>Histórico</h3>

                  <div className="historico">
                    {historico.map((item) => (
                      <div
                        className="historico-item"
                        key={item.id}
                      >
                        <span>
                          🌡 {item.temperatura.toFixed(1)}°C
                        </span>

                        <span>
                          💧 {item.umidade.toFixed(1)}%
                        </span>

                        <small>
                          {new Date(
                            item.horario
                          ).toLocaleTimeString()}
                        </small>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p>Sem leituras.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}