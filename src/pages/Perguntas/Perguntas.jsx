import "./Perguntas.css";

export default function Perguntas() {
  return (
    <div>
      <section className="perguntas-hero">
        <h1>Perguntas Frequentes</h1>
        <p>Veja as respostas de perguntas frequentes</p>
        <div>
          <h2>Geral</h2>

          <details className="item">
            <summary>O que é a SiloTech?</summary>
            <p>Somos uma empresa especializada em tecnologia para silos.</p>
          </details>

          <details className="item">
            <summary>Quais tipos de empresas vocês atendem?</summary>
            <p>Atendemos empresas do setor agrícola e industrial.</p>
          </details>

          <details className="item">
            <summary>Onde a SiloTech está localizada?</summary>
            <p>Concórdia - SC, Brasil.</p>
          </details>
          
          <details className="item">
            <summary>O sistema emite alertas automaticamente?</summary>
            <p>Sim. Quando valores críticos de temperatura ou umidade são detectados, o sistema gera alertas na interface web para avisar o usuário sobre possíveis riscos no armazenamento dos grãos.</p>
          </details>

          <details className="item">
            <summary>É possível visualizar dados antigos das leituras?</summary>
            <p>Sim. O sistema armazena todas as leituras no banco de dados SQLite, permitindo consultar o histórico de temperatura, umidade e níveis de risco por meio da interface web.</p>
          </details>

        </div>
      </section>
    </div>
  );
}