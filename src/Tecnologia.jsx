import "./Tecnologias.css"
export default function Tecnologias() {
  return (
    <div>
      {/* HEADER */}
      <header className="header">
        <div className="container header-container">
          <div className="logo">🌱 <span>SiloTech</span></div>

          <nav className="nav">
            <a href="#">Início</a>
            <a href="#">Recursos</a>
            <a href="#" className="active">Tecnologia</a>
            <button className="btn">Fale Conosco</button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <span className="badge">Inovação & Engenharia</span>
          <h1>Tecnologia de Ponta Para o Agronegócio</h1>
          <p>
            Uma combinação de hardware robusto, software inteligente e infraestrutura
            em nuvem escalável para oferecer o melhor em gestão de silos.
          </p>
        </div>
      </section>

      {/* ARQUITETURA */}
      <section className="arquitetura">
        <div className="container">
          <h2>Arquitetura da Solução</h2>
          <p className="subtitle">
            Sistema end-to-end projetado para máxima confiabilidade e performance
          </p>

          <div className="cards">
            <div className="card">
              <div className="icon">📡</div>
              <h3>Camada de Sensores</h3>
              <p>Rede de sensores IoT para coleta de dados em tempo real.</p>
            </div>

            <div className="card">
              <div className="icon">💻</div>
              <h3>Processamento Edge</h3>
              <p>Processamento local garantindo funcionamento offline.</p>
            </div>

            <div className="card">
              <div className="icon">🔒</div>
              <h3>Cloud Segura</h3>
              <p>Infraestrutura escalável com backups automáticos.</p>
            </div>

            <div className="card">
              <div className="icon">⚡</div>
              <h3>Analytics & IA</h3>
              <p>Modelos que geram insights inteligentes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className="stack">
        <div className="container">
          <h2>Stack Tecnológico</h2>

          <div className="stack-cards">
            <div className="card">
              <h3>Sensores & Hardware</h3>
              <p>Temperatura, Umidade, IoT Industrial</p>
            </div>

            <div className="card">
              <h3>Software & Cloud</h3>
              <p>Node.js, PostgreSQL, AWS</p>
            </div>

            <div className="card">
              <h3>Segurança</h3>
              <p>TLS, OAuth, Backup</p>
            </div>
          </div>
        </div>
      </section>

      {/* INOVAÇÃO */}
      <section className="inovacao">
        <div className="container inovacao-content">
          <div className="text">
            <h2>Inovação Contínua</h2>
            <p>
              Nossa equipe trabalha constantemente para melhorar a tecnologia e criar novas soluções.
            </p>

            <ul>
              <li>Atualizações automáticas</li>
              <li>Novos recursos</li>
              <li>Parcerias com universidades</li>
            </ul>

            <button className="btn">Fale com Especialista</button>
          </div>

          <img
            src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae"
            alt="Agro"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container stats">
          <div>99.9%<span>Uptime</span></div>
          <div>&lt;100ms<span>Latência</span></div>
          <div>1M+<span>Leituras</span></div>
          <div>24/7<span>Monitoramento</span></div>
        </div>
      </footer>

    </div>
  );
}
