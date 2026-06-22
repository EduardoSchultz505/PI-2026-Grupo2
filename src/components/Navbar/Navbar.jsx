import { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const atualizarStatus = () => {
      setRole(localStorage.getItem("role"));
    };

    atualizarStatus();

    window.addEventListener("storage", atualizarStatus);
    window.addEventListener("local-storage-update", atualizarStatus);

    return () => {
      window.removeEventListener("storage", atualizarStatus);
      window.removeEventListener("local-storage-update", atualizarStatus);
    };
  }, [location]);

  return (
 
  <div className="navbar-wrapper">
    <nav className="navbar-actual">
      <NavLink className="Mains" to="/">
        <img src={Logo} width={50} height={50} alt="Logo" />
        <span>SiloTech</span>
      </NavLink>

      <div className="direita">
        <ul className="url">
          <li><NavLink to="/">Início</NavLink></li>
          <li><NavLink to="/tecnologia">Tecnologia</NavLink></li>
          <li><NavLink to="/sobrenos">Sobre Nós</NavLink></li>
          <li><NavLink to="/contato">Contato</NavLink></li>

          {role === "admin" && (
            <li>
              <NavLink to="/admin">Admin</NavLink>
            </li>
          )}
        </ul>

        <div className="Botao">
          {role ? (
            <NavLink 
              className="Login" 
              to={role === "admin" ? "/admin" : "/conta"}
            >
              Minha Conta
            </NavLink>
          ) : (
            <NavLink className="Login" to="/login">
              Entrar
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  </div>
);
}
