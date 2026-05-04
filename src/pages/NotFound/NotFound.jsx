import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <h2>Ops! Essa página não existe.</h2>
      <p>Parece que você se perdeu pelos silos...</p>
      <Link to="/">Voltar para o Início</Link>
    </div>
  );
}