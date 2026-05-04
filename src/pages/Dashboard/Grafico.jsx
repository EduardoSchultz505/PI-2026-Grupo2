import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";
import "./Grafico.css";

const API_URL = "http://127.0.0.1:8000";

const GraficosSensores = () => {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sensorSelecionado, setSensorSelecionado] = useState("Silo_Norte");
  
  const usuarioId = localStorage.getItem("user_id");

  const buscarDados = useCallback(async () => {
    if (!usuarioId) return;

    try {
      const response = await axios.get(
        `${API_URL}/sensor/meu-historico/${usuarioId}?sensor=${sensorSelecionado}`
      );

      const formatados = response.data.reverse().map((item) => ({
        ...item,
        horaFormatada: new Date(item.horario.replace(" ", "T")).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));

      setDados(formatados);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  }, [usuarioId, sensorSelecionado]);

  useEffect(() => {
    setLoading(true);
    buscarDados();
    
    const interval = setInterval(buscarDados, 10000);
    return () => clearInterval(interval);
  }, [buscarDados]);

  if (!usuarioId) return <h2 className="loading-text">Faça login para ver seus dados.</h2>;

  return (
    <div className="dashboard-container">
      <div className="header-dashboard">
        <h2>Monitoramento de Silos</h2>
        
        {/* Seletor de Sensores */}
        <div className="selector-container">
          <label>Selecione o Sensor: </label>
          <select 
            value={sensorSelecionado} 
            onChange={(e) => setSensorSelecionado(e.target.value)}
          >
            <option value="Silo_Norte">Silo Norte</option>
            <option value="Silo_Sul">Silo Sul</option>
            <option value="Armazem_Principal">Armazém Principal</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="loading-text">Buscando dados do sensor...</p>
      ) : (
        <>
          <div className="chart-section">
            <h3 className="chart-title temp">Temperatura (°C) - {sensorSelecionado}</h3>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={dados}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="horaFormatada" />
                  <YAxis domain={["auto", "auto"]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="temperatura"
                    stroke="#ff4d4d"
                    strokeWidth={3}
                    name="Temp °C"
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-section">
            <h3 className="chart-title">Umidade (%) - {sensorSelecionado}</h3>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={dados}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="horaFormatada" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="umidade"
                    stroke="#8884d8"
                    strokeWidth={3}
                    name="Umid %"
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GraficosSensores;