import "./Tecnologias.css"
import { CiWifiOn, CiServer } from "react-icons/ci";
import { FiShield } from "react-icons/fi";
import { IoFlashOutline } from "react-icons/io5";
import Trator2 from "../../assets/trator2.jpeg"
import { Link } from "react-router-dom";


export default function Tecnologias() {
  return (
    <div className="tecnologias">
      <section>
        <div className="tecnologias-hero">
          <h1>Tecnologia de Ponta</h1>
          <p>Uma combinação de hardware robusto e software inteligente para oferecer o melhor em gestão de silos.</p>
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
              <p>Rede de sensores para coleta de dados em tempo real.</p>
            </div>

            <div>
              <CiServer />
              <h3>Processamento</h3>
              <p>Processamento local garantindo.</p>
            </div>

            <div>
              <FiShield />
              <h3>Cloud Segura</h3>
              <p>Segurança de ponta com seus dados</p>
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
      <p>Sensor de Temperatura</p>
      <p>Sensor de Umidade</p>
      <p>Microcontroladores</p>
      <p>Conectividade Wi-Fi</p>
      <p>Baixo consumo de energia</p>
    </div>

    <div>
      <h3>Software & Cloud</h3>
      <p>React para interface web</p>
      <p>Python com FastAPI</p>
      <p>SQLite para armazenamento</p>
      <p>Atualização de dados em tempo real</p>
    </div>

    <div>
      <h3>Inteligência & Monitoramento</h3>
      <p>Gráficos em tempo real</p>
      <p>Histórico de medições</p>
      <p>Alertas de temperatura e umidade</p>
      <p>Análise contínua dos dados</p>
      <p>Dashboard intuitivo</p>
    </div>

    <div>
      <h3>Segurança & Confiabilidade</h3>
      <p>Autenticação de usuários</p>
      <p>Armazenamento seguro</p>
      <p>Alta disponibilidade do sistema</p>
    </div>
  </div>
      </section>

      <section className="inovacao">
  <div>
    <h1>Inovação Contínua</h1>

    <p>
      Acreditamos que a inovação é fundamental para transformar o agronegócio.
      Por isso, buscamos constantemente aprimorar nossas soluções, explorando
      novas tecnologias e métodos que contribuam para maior eficiência no campo.
    </p>

    <p>
      Nosso compromisso é desenvolver ferramentas modernas, acessíveis e
      alinhadas às necessidades dos produtores, mantendo o foco na qualidade,
      praticidade e evolução contínua dos nossos projetos.
    </p><br></br>

    <p className="tec-objetivos">Nosso objetivos são:</p>

    <ul>
      <li>Desenvolvimento contínuo de novas funcionalidades</li>
      <li>Aplicação de tecnologias voltadas à automação agrícola</li>
      <li>Pesquisa e estudo de tendências do setor agropecuário</li>
      <li>Melhoria constante baseada em testes e avaliações</li>
      <li>Foco em soluções inovadoras, eficientes e sustentáveis</li>
    </ul>

    <Link className="botao-especialista" to={'/contato'}>
      Fale Conosco
    </Link>
  </div>

  <div className="trator-2">
    <img src={Trator2} alt="Máquina agrícola" />
  </div>
</section>
    </div>
  );
}
