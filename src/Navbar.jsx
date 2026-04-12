import { NavLink } from "react-router-dom";
import Logo from "./assets/Logo.png";
import "./Navbar.css"

export default function Navbar() {
  return (
      <nav>
        <a className="Mains" href="/">
          <img src={Logo} width={50} height={50} alt="Logo" />
          <span> SiloTech</span>
        </a>

        <div className="direita">
          <ul className="url">
            <li><NavLink to="/">Início</NavLink></li>
            <li><NavLink to="/tecnologia">Tecnologia</NavLink></li>
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            <li><NavLink to="/contato">Contato</NavLink></li>
          </ul>

          <div className="Botao">
            <a className="Login" href="/login">Entrar</a>
            <a className="Cadastro" href="/cadastro">Cadastro</a>
          </div>
        </div>
      </nav>
  );
}