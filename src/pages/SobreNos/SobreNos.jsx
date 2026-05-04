import "./SobreNos.css";
import { useNavigate } from "react-router-dom";

export default function Sobre() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sobre-container">
      <section className="sobre-header">
        <h1>Quem somos</h1>
        <p>
          Transformamos tecnologia em soluções práticas para o agronegócio,
          ajudando produtores a protegerem seus silos com dados precisos.
        </p>
      </section>
      <section className="sobre-bloco">
        <div className="texto">
          <h2>Nossa missão</h2>
          <p>
            Levar monitoramento inteligente para o campo, reduzindo perdas e
            aumentando a eficiência no armazenamento de grãos através de dados
            em tempo real.
          </p>
        </div>

        <img src={""} alt="Silo monitorado" />
      </section>
      <section className="sobre-cards">

        <div className="card">
          <h3>Visão</h3>
          <p>
            Ser referência em tecnologia para monitoramento agrícola no Brasil.
          </p>
        </div>

        <div className="card">
          <h3>Inovação</h3>
          <p>
            Utilizamos sensores e software para trazer controle total ao produtor.
          </p>
        </div>

        <div className="card">
          <h3>Confiabilidade</h3>
          <p>
            Dados seguros e acessíveis a qualquer momento.
          </p>
        </div>

      </section>
      <section className="sobre-diferencial">
        <h2>Por que escolher nossa solução?</h2>

        <ul>
          <li>Monitoramento contínuo de temperatura e umidade</li>
          <li>Interface simples e acessível</li>
          <li>Histórico completo de dados</li>
          <li>Integração com sensores físicos</li>
        </ul>
      </section>
        <button onClick={handleLogout} className="botao-sair">
        Sair da Conta
      </button>
    </div>
  )
}
