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

        </div>
      </section>
    </div>
  );
}