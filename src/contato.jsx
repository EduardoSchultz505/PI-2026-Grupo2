import { useState } from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import "./contato.css";

export default function Contato() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    empresa: "",
    telefone: "",
    mensagem: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(form);
    alert("Mensagem enviada com sucesso!");
  }

  return (
    <div className="contato-container">

      {/* HERO */}
      <section className="contato-hero">
        <h1>Entre em Contato</h1>
        <p>Vamos conversar sobre como podemos transformar seu negócio</p>
      </section>

      {/* CONTEÚDO */}
      <section className="contato-content">
        
        {/* FORMULÁRIO */}
        <div className="formulario">
          <h2>Envie uma mensagem</h2>

          <form onSubmit={handleSubmit}>
            <label>Nome completo</label>
            <input type="text" name="nome" onChange={handleChange} required />

            <label>Email</label>
            <input type="email" name="email" onChange={handleChange} required />

            <label>Empresa</label>
            <input type="text" name="empresa" onChange={handleChange} />

            <label>Telefone</label>
            <input type="text" name="telefone" onChange={handleChange} />

            <label>Mensagem</label>
            <textarea name="mensagem" rows="5" onChange={handleChange} required />

            <button type="submit">Enviar mensagem</button>
          </form>
        </div>

        {/* INFORMAÇÕES */}
        <div className="info">
          <h2>Informações de contato</h2>
          <p>
            Nossa equipe está pronta para atender você. Entre em contato através de qualquer um dos nossos canais.
          </p>

          <div className="info-item">
            <FiMail />
            <div>
              <strong>Email</strong>
              <p>contato@silotech.com.br</p>
            </div>
          </div>

          <div className="info-item">
            <FiPhone />
            <div>
              <strong>Telefone</strong>
              <p>+55 11 1234-5678</p>
            </div>
          </div>

          <div className="info-item">
            <FiMapPin />
            <div>
              <strong>Endereço</strong>
              <p>Av. Paulista, 1000 - São Paulo, SP</p>
            </div>
          </div>

          <div className="horario">
            <h3>Horário de atendimento</h3>
            <p>Segunda a Sexta: 8h às 18h</p>
            <p>Sábado: 9h às 13h</p>
            <span>Suporte técnico 24/7</span>
          </div>
        </div>
      </section>

      {/* MAPA */}
      <section className="mapa">
        <div className="mapa-box">
          <FiMapPin size={40} />
          <p>Mapa interativo</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <h2>SiloTech</h2>
            <p>Inovação em tecnologia para o futuro</p>
          </div>

          <div>
            <h3>Soluções</h3>
            <p>Infraestrutura</p>
            <p>Cloud Computing</p>
            <p>Segurança</p>
            <p>Consultoria</p>
          </div>

          <div>
            <h3>Empresa</h3>
            <p>Sobre nós</p>
            <p>Carreiras</p>
            <p>Blog</p>
            <p>Contato</p>
          </div>

          <div>
            <h3>Contato</h3>
            <p>contato@silotech.com.br</p>
            <p>+55 11 1234-5678</p>
            <p>São Paulo, Brasil</p>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 Silotech. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}