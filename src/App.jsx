import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Contato from "./pages/Contato/contato.jsx";
import Tecnologias from "./pages/Tecnologias/Tecnologias.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Login from "./pages/Login/Login.jsx";
import Cadastro from "./pages/Cadastro/Cadastro.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import SobreNos from "./pages/SobreNos/SobreNos.jsx"
import Conta from "./pages/Conta/Conta.jsx"
import Grafico from "./pages/Dashboard/Grafico.jsx"; 
import ScrollToTop from "./components/Scroll.jsx";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/tecnologia" element={<Tecnologias />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/cadastro" element={<Cadastro />}/>
        <Route path="sobrenos" element={<SobreNos />} />
        <Route path="/conta" element={<Conta />} />
        
        {/* CORREÇÃO AQUI: Use o nome correto do componente */}
        <Route path="/dashboard" element={<Grafico sensorId="1" />} />
        
        {/* O "*" deve ser a última rota */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;