import { Link } from "react-router-dom";
import { FaRegCircleCheck, FaArrowRight } from "react-icons/fa6";
import { GoGraph } from "react-icons/go";
import { FiShield } from "react-icons/fi";
import { IoFlashOutline } from "react-icons/io5";
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
          <Link to="/tecnologia" className="Tecnologia">Veja nossa Tecnologia  <FaArrowRight/></Link>
        </div>
        <img src={Trator}></img>
      </section>

      <section className="section3">
        <div>
          <h1>Por Que Escolher a SiloTech?</h1>
          <p>Soluções desenvolvidas especificamente para os desafios do armazenamento agrícola</p>
        </div>
        <div className="cards">
          <div>
            <GoGraph/>
            <h2>Análise Inteligente</h2>
            <p>Dashboards intuitivos com insights acionáveis sobre sua produção</p>
          </div>
          <div>
            <FiShield/>
            <h2>Máxima Segurança</h2>
            <p>Proteção de dados com criptografia de ponta a ponta</p>
          </div>
          <div>
            <IoFlashOutline/>
            <h2>Resposta Rápida</h2>
            <p>Notificações instantâneas para qualquer variação crítica</p>
          </div>
        </div>
      </section>
    </div>
  );
}