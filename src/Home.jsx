import { Link } from "react-router-dom";

import "./index.css"
export default function HomePage() {
  return (
    <div>
      <section className="hero">
        <div className="hero-conteudo">
          <h1>SiloTech</h1>
          <p>Transformando a gestão de armazenamento agrícola com<br></br>
          tecnologia de ponta. Monitoramento inteligente, controle total<br></br>
          e eficiência para sua produção.</p>

          <Link className="iniciar" to="/cadastro">Iniciar Agora</Link>
        </div>
      </section>
    </div>
  );
}