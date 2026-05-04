import React from "react";
import { useNavigate } from "react-router-dom";
import { GraficoUmidade, GraficoTemperatura } from "./Grafico";

export default function Dashboard() {
  const nomeUsuario = localStorage.getItem("userName");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      <section className="Dashboard">
        <h2>Dashboard</h2>
        <p>Bem-vindo ao seu painel de controle!</p>
        <GraficoUmidade />
        <GraficoTemperatura />
      </section>
      <div>
      <h1>Olá, {nomeUsuario || "Visitante"}!</h1>
      <p>Bem-vindo ao SiloTech.</p>
      <button onClick={handleLogout} className="botao-sair">
        Sair da Conta
      </button>
    </div>
    </div>
  );
}

