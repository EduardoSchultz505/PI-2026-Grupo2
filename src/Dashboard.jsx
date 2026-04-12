import Logo from "./assets/Logo.png";
import { GraficoUmidade, GraficoTemperatura } from "./Grafico";

export default function Dashboard() {
  return (
    <div>
      <section className="Dashboard">
        <h2>Dashboard</h2>
        <p>Bem-vindo ao seu painel de controle!</p>
        <GraficoUmidade />
        <GraficoTemperatura />
      </section>
    </div>
  );
}
