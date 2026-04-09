import Logo from "./assets/Logo.png";
import Hero from "./assets/SiloIMG.webp"

export default function HomePage() {
  return (
    <div>
      <nav>
        <a href="/" className="Mains">
          <img src={Logo} width={50} height={50} alt="Logo" />
          <span>SiloTech</span>
        </a>
        <ul className="url">
          <li><a href="/">Dashboard</a></li>
          <li><a href="/">Sobre nós</a></li>
          <li><a href="/">Contato</a></li>
        </ul>
        <div className="Entrada">
          <a href="/" className="asd">Fazer Login</a>
          <a href="/" className="asd">Iniciar Agora</a>
        </div>
      </nav>

      <section className="Hero">
        <div>
          <h1>Diminuindo suas perdas de grãos.</h1>
          <p>Reduza perdas, aumente a qualidade e tenha controle total do armazenamento com tecnologia.</p>
        </div>
          <img src={Hero} alt="Imagem de Silo de Grãos"/>
      </section>
    </div>
  );
}