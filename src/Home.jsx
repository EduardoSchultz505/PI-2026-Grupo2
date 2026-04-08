import Logo from "./assets/Logo.png";
import Hero from "./assets/SiloIMG.webp"

export default function HomePage() {
  return (
    <div>
      <nav>
        <a href="/">
          <img src={Logo} width={50} alt="Logo" />
        </a>
        <ul className="url">
          <li><a href="/">Dashboard</a></li>
          <li><a href="/">Sobre nós</a></li>
          <li><a href="/">Contato</a></li>
        </ul>
      </nav>

      <article className="Hero">
        <div>
          <h1>Diminuindo suas perdas de grãos.</h1>
          <p>Reduza perdas, aumente a qualidade e tenha controle total do armazenamento com tecnologia.</p>
        </div>
          <img src={Hero}/>
      </article>
    </div>
  );
}