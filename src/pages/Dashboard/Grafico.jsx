import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./Grafico.css";

function Grafico() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listaSensores, setListaSensores] = useState([]);
  const [sensorSelecionado, setSensorSelecionado] = useState("");
  const [erro, setErro] = useState("");

  const usuarioId = localStorage.getItem("user_id");

  const buscarSensoresDisponiveis = useCallback(async () => {
    if (!usuarioId) return;
    try {
      setErro("");
      const response = await axios.get(
        `http://127.0.0.1:8000/sensor/lista-sensores/${usuarioId}`
      );
      setListaSensores(response.data);

      if (response.data.length > 0 && !sensorSelecionado) {
        setSensorSelecionado(response.data[0]);
      }
    } catch (error) {
      console.error("Erro ao buscar lista de sensores:", error);
      setErro("Erro ao carregar sensores. Verifique se a API está rodando.");
    }
  }, [usuarioId, sensorSelecionado]);

  const buscarDados = useCallback(async () => {
    if (!usuarioId || !sensorSelecionado) return;

    setLoading(true);
    try {
      setErro("");
      const response = await axios.get(
        `http://127.0.0.1:8000/sensor/meu-historico/${usuarioId}`,
        {
          params: { sensor: sensorSelecionado }
        }
      );
      
      const formatados = response.data.reverse().map((item) => ({
        temperatura: item.temperatura,
        umidade: item.umidade,
        horaFormatada: new Date(item.horario.replace(" ", "T")).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));

      setDados(formatados);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setErro("Erro ao carregar dados do sensor. Tente novamente.");
      setDados([]);
    } finally {
      setLoading(false);
    }
  }, [usuarioId, sensorSelecionado]);

  useEffect(() => {
    buscarSensoresDisponiveis();
  }, [buscarSensoresDisponiveis]);

  useEffect(() => {
    if (sensorSelecionado) {
      buscarDados();
      const interval = setInterval(buscarDados, 10000); // Atualiza a cada 10 segundos
      return () => clearInterval(interval);
    }
  }, [buscarDados, sensorSelecionado]);

  if (!usuarioId)
    return <h2 className="loading-text">Faça login para ver seus dados.</h2>;

  return (
    <div className="dashboard-container">
      <div className="header-dashboard">
        <h2>Monitoramento de Silos</h2>

        <div className="selector-container">
          <label>Selecione o Sensor: </label>
          <select
            value={sensorSelecionado}
            onChange={(e) => setSensorSelecionado(e.target.value)}
          >
            <option value="">-- Selecione um sensor --</option>
            {listaSensores.map((nome) => (
              <option key={nome} value={nome}>
                {nome.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      {erro && (
        <div style={{ 
          padding: "15px", 
          backgroundColor: "#fee", 
          color: "#c33", 
          borderRadius: "5px",
          marginBottom: "15px"
        }}>
          ⚠️ {erro}
        </div>
      )}

      {listaSensores.length === 0 ? (
        <p className="loading-text">Aguardando dados de algum sensor...</p>
      ) : !sensorSelecionado ? (
        <p className="loading-text">Selecione um sensor para visualizar dados...</p>
      ) : loading && dados.length === 0 ? (
        <p className="loading-text">
          Buscando dados do sensor {sensorSelecionado}...
        </p>
      ) : (
        <div>
          <div className="chart-section">
            <h3 className="chart-title temp">
              Temperatura (°C) - {sensorSelecionado}
            </h3>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={dados}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="horaFormatada" minTickGap={15} tick={{ fontSize: 12 }} />
                  <YAxis domain={["auto", "auto"]} tick={{ fontSize: 12 }} />
                  <Tooltip trigger="click" touchDimension="x" />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="temperatura"
                    stroke="#ff4d4d"
                    strokeWidth={3}
                    name="Temp °C"
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-section">
            <h3 className="chart-title">Umidade (%) - {sensorSelecionado}</h3>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={dados}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="horaFormatada" minTickGap={15} tick={{ fontSize: 12 }} />
                  <YAxis domain={["auto", "auto"]} tick={{ fontSize: 12 }} />
                  <Tooltip trigger="click" touchDimension="x" />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="umidade"
                    stroke="#8884d8"
                    strokeWidth={3}
                    name="Umid %"
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {dados.length === 0 && (
            <p className="loading-text">Nenhum dado disponível para este sensor.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Grafico;
