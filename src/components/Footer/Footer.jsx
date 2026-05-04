import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer () {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-item">
          <h2>Silotech</h2>
          <p>Inovação em tecnologia para o futuro</p>
        </div>

        <div className="footer-item">
          <h3>Soluções</h3>
            <Link>Infraestrutura</Link>
            <Link>Segurança</Link>
            <Link>Consultoria</Link>
        </div>

        <div className="footer-item">
          <h3>Empresa</h3>
            <Link>Sobre nós</Link>
            <Link to={"/contato"}>Contato</Link>
            <Link to={"/cadastro"}>Acesso Admin</Link>
        </div>

        <div className="footer-item">
          <h3>Contato</h3>
          <p>contato@silotech.com.br</p>
          <p>+55 (49) 98891-8437</p>
          <p>Concórdia, Santa Catarina, Brasil</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Silotech. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;