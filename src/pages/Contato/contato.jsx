import { useState } from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Contato.css";
import emailjs from "@emailjs/browser";

export default function Contato() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
    motivo: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    emailjs
      .send(
        "service_i5rftbl",
        "template_73lrsmv",
        {
          nome: form.nome,
          mensagem: form.mensagem,
          email: form.email,
          telefone: form.telefone,
          motivo: form.motivo,
        },
        "E1Gje9mCyLE_2huJB"
      )
      .then(() => {
        alert("Mensagem enviada com sucesso!");
      
        setForm({
          nome: "",
          email: "",
          telefone: "",
          mensagem: "",
          motivo: ""
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Erro ao enviar mensagem.");
      });
  }

  return (
    <div>
      <section className="contato-hero">
        <h1>Entre em Contato</h1>
        <p>Entre em contato conosco através de qualquer um dos canais abaixo ou preencha o formulário ao lado.</p>
      </section>
      <section className="contato-content">

        <div className="info">
          <h2>Informações de contato</h2>
          <p>
            Nossa equipe está pronta para atender você. Entre em contato através de qualquer um dos nossos canais.
          </p>

          <div className="info-item">
            <FiMail />
            <div>
              <strong>Email</strong>
              <p>silotech.concordia@gmail.com</p>
            </div>
          </div>

          <div className="info-item">
            <FiPhone />
            <div>
              <strong>Telefone</strong>
              <p>+55 49 98891-8437</p>
            </div>
          </div>

          <div className="info-item">
            <FiMapPin />
            <div>
              <strong>Endereço</strong>
              <p>Concórdia - SC</p>
            </div>
          </div>
        </div>
        <div className="formulario">
          <h2>Envie uma mensagem</h2>

<form onSubmit={handleSubmit}>
  <div className="input">
    <label>Nome completo</label>
    <input
      type="text"
      name="nome"
      onChange={handleChange}
      required
    />
  </div>

  <div className="input">
    <label>Email</label>
    <input
      type="email"
      name="email"
      onChange={handleChange}
      required
    />
  </div>

  <div className="input">
    <label>Telefone</label>
    <input
      type="text"
      name="telefone"
      onChange={handleChange}
      required
    />
  </div>

  <div className="input">
    <label>Motivo</label>
    <select name="motivo" onChange={handleChange} required>
      <option value="">Selecione uma opção</option>
      <option value="suporte">Suporte</option>
      <option value="consulta">Consulta</option>
      <option value="parceria">Parceria</option>
      <option value="outro">Outro</option>
    </select>
  </div>

  <div className="input grande">
    <label>Mensagem</label>
    <textarea
      name="mensagem"
      rows="5"
      onChange={handleChange}
      required
    />
  </div>

  <button type="submit">Enviar mensagem</button>
</form>
        </div>
      </section>
    </div>
  );
}