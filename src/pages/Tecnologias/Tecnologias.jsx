import "./Tecnologias.css"
import { CiWifiOn, CiServer } from "react-icons/ci";
import { FiShield } from "react-icons/fi";
import { IoFlashOutline } from "react-icons/io5";
import Trator2 from "../../assets/trator2.jpeg"
import { Link } from "react-router-dom";


export default function Tecnologias() {
  return (
    <div>
      <section className="hero2">
        <div className="hero2-text">
          <span>Inovação & Engenharia</span>
          <h1>Tecnologia de Ponta Para o Agronegócio</h1>
          <p>Uma combinação de hardware robusto, software inteligente e infraestrutura em nuvem escalável para oferecer o melhor em gestão de silos.</p>
        </div>
      </section>

      <section className="arquitetura">
        <div className="arquitetura-titulo">
          <h1>Arquitetura da Solução</h1>
          <p>Sistema end-to-end projetado para máxima confiabilidade e performance</p>
        </div>

          <div className="cards-tecnologia">
            <div>
              <CiWifiOn />
              <h3>Camada de Sensores</h3>
              <p>Rede de sensores IoT para coleta de dados em tempo real.</p>
            </div>

            <div>
              <CiServer />
              <h3>Processamento Edge</h3>
              <p>Processamento local garantindo funcionamento offline.</p>
            </div>

            <div>
              <FiShield />
              <h3>Cloud Segura</h3>
              <p>Infraestrutura escalável com backups automáticos.</p>
            </div>

            <div>
              <IoFlashOutline />
              <h3>Analytics & IA</h3>
              <p>Modelos que geram insights inteligentes.</p>
            </div>
          </div>
      </section>

      <section className="stack">
        <div className="stack-titulo">
          <h1>Stack Tecnológico</h1>
          <p>Utilizamos as melhores tecnologias do mercado para garantir performance e confiabilidade</p>
        </div>

          <div className="cards-tecnologia">
            <div>
              <h3>Sensores & Hardware</h3>
              <p>Temperatura</p>
              <p>Umidade</p>
              <p>Conectividade</p>
            </div>

            <div>
              <h3>Software & Cloud</h3>
              <p>React</p>
              <p>SQLite</p>
            </div>
          </div>
      </section>

      <section className="inovacao">
        <div>
          <h1>Inovação Contínua</h1>
          <p>Nossa equipe de engenheiros e cientistas de dados trabalha constantemente para melhorar nossa tecnologia e adicionar novos recursos.</p>
          <p>Investimos 20% da nossa receita em P&D para garantir que você sempre tenha acesso às soluções mais avançadas do mercado.</p>

          <ul>
            <li>Atualizações automáticas de firmware via OTA</li>
            <li>Novos recursos lançados trimestralmente</li>
            <li>Pesquisa em parceria com universidades</li>
            <li>Feedback direto dos clientes no roadmap</li>
          </ul>

          <Link className="botao-especialista">Fale com Especialistas</Link>
        </div>

        <div className="trator-2">
          <img src={Trator2} alt="Máquina agrícola"/>
        </div>

      </section>
    </div>
  );
}
