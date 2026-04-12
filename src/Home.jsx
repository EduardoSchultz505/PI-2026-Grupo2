import { Link } from "react-router-dom";
import { FaRegCircleCheck } from "react-icons/fa6";
import Trator from "./assets/trator.jpg"


import "./index.css"
export default function HomePage() {
  return (
    <div>
      <section className="hero">
        <div className="hero-conteudo">
          <h1>SiloTech</h1>
          <p>Transformando a gestão de armazenamento agrícola com
          tecnologia de ponta. Monitoramento inteligente, controle total
          e eficiência para sua produção.</p>
          <Link className="iniciar" to="/cadastro">Iniciar Agora</Link>
        </div>
      </section>
      <section className="section2">
        <div className="texto2">
          <h1>Controle Total da Sua Produção</h1>
          <p>Nossa plataforma integrada oferece visibilidade completa do armazenamento, desde a temperatura até a umidade dos grãos.</p>
          
          <div>
            <div className="items"><FaRegCircleCheck/><span>Monitoramento em tempo real de temperatura e umidade</span></div>
            <div className="items"><FaRegCircleCheck/><span>Alertas automáticos para condições críticas</span></div>
            <div className="items"><FaRegCircleCheck/><span>Relatórios detalhados de performance</span></div>
            <div className="items"><FaRegCircleCheck/><span>Integração com sistemas de gestão existentes</span></div>
          </div>
          
          <Link to="/tecnologia" className="Tecnologia">Veja nossa Tecnologia</Link>
        </div>
        <img src={Trator}></img>
      </section>
    </div>
  );
}