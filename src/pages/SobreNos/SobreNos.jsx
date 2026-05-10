import "./SobreNos.css";
import { useNavigate } from "react-router-dom";
import Silo from "../../assets/Silo.png"
export default function Sobre() {
  const navigate = useNavigate();

  function sair() {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sobre-container">
      <section className="sobre-hero">
        <h1>Sobre a SiloTech</h1>
        <p>
          Somos uma empresa de tecnologia dedicada a transformar negócios através de soluções inovadoras e personalizadas.
        </p>
      </section>
      <section className="sobre-bloco">
        <div className="texto">
          <h2>Nossa História</h2>
          <p>
            Fundada em 2026, a SiloTech surgiu com o objetivo de auxiliar produtores rurais da região Oeste de Santa Catarina
            no monitoramento das condições de armazenamento de grãos. <br></br><br></br>
          </p>
          <p>
            Nossa proposta é monitorar temperatura e umidade em silos de grãos, ajudando a prevenir perdas causadas
            por fungos, excesso de umidade e variações climáticas. Utilizando tecnologias como Arduino e
            sensores. Nós buscamos oferecer mais segurança, praticidade e controle aos produtores. <br></br><br></br>
          </p>
          <p>
            O projeto foi desenvolvido por estudantes do Curso Técnico em Informática do Instituto Federal Catarinense
            — Campus Concórdia, unindo tecnologia e agronegócio para criar uma solução acessível, eficiente e de baixo custo.
          </p>
        </div>

        <img src={Silo} alt="Silo monitorado" />
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
        <button onClick={sair} className="botao-sair">
        Sair da Conta
      </button>
    </div>
  )
}
