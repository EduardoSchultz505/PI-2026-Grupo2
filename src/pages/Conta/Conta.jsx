import React, { useState } from "react";
import axios from "axios";

const FormularioLeitura = () => {
  const [sensorNome, setSensorNome] = useState("Silo_Norte");
  const [temperatura, setTemperatura] = useState("");
  const [umidade, setUmidade] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      alert("Erro: Você precisa estar logado para enviar dados.");
      return;
    }

    setEnviando(true);

    const payload = {
      sensor_nome: sensorNome,
      temperatura: parseFloat(temperatura),
      umidade: parseFloat(umidade),
      owner_id: parseInt(userId),
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/sensor/leitura", payload);
      
      if (response.status === 200) {
        alert(`Leitura enviada para ${sensorNome} com sucesso!`);
        setTemperatura("");
        setUmidade("");
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Falha ao enviar dados para o servidor.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="chart-section" style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h3 className="chart-title">Enviar Leitura Manual</h3>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label>Sensor</label>
          <select 
            value={sensorNome} 
            onChange={(e) => setSensorNome(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
          >
            <option value="Silo_Norte">Silo Norte</option>
            <option value="Silo_Sul">Silo Sul</option>
            <option value="Armazem_Principal">Armazém Principal</option>
          </select>
        </div>

        <div className="input-group">
          <label>Temperatura (°C)</label>
          <input
            type="number"
            step="0.1"
            value={temperatura}
            onChange={(e) => setTemperatura(e.target.value)}
            placeholder="Ex: 25.5"
            required
          />
        </div>

        <div className="input-group">
          <label>Umidade (%)</label>
          <input
            type="number"
            step="0.1"
            value={umidade}
            onChange={(e) => setUmidade(e.target.value)}
            placeholder="Ex: 60"
            required
          />
        </div>

        <button 
          type="submit" 
          className="botao-login" 
          disabled={enviando}
          style={{ marginTop: "10px" }}
        >
          {enviando ? "Enviando..." : "Registrar Leitura"}
        </button>
      </form>
    </div>
  );
};

export default FormularioLeitura;