import Logo from "./assets/Logo.png";
import Grafico from "./Grafico.jsx";
import App from "./Grafico.jsx";

export default function Dashboard() {
  return (
    <div>
      <section className="Dashboard">
        <h2>Dashboard</h2>
        <p>Bem-vindo ao seu painel de controle!</p>
        <Grafico />
        <App />
      </section>
    </div>
  );
}
