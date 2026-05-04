import { useState } from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Contato.css";

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
    <div>
      <section className="contato-hero">
        <h1>Entre em Contato</h1>
        <p>Vamos conversar sobre como podemos transformar seu negócio</p>
      </section>
      <section className="contato-content">
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
            <input type="text" name="telefone" onChange={handleChange} required/>

            <label>Mensagem</label>
            <textarea name="mensagem" rows="5" onChange={handleChange} required />

            <Link type="submit">Enviar mensagem</Link>
          </form>
        </div>

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
            <h2>Horário de atendimento</h2>
            <p>Segunda a Sexta: 8h às 18h</p>
            <p>Sábado: 9h às 13h</p>
            <strong>Suporte técnico 24/7</strong>
          </div>
        </div>
      </section>
    </div>
  );
}