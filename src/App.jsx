import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Home from "./pages/Home/Home.jsx"
import Navbar from "./components/Navbar/Navbar.jsx";
import Contato from "./pages/Contato/contato.jsx"
import Tecnologias from "./pages/Tecnologias/Tecnologias.jsx"
import Footer from "./components/Footer/Footer.jsx";
import Login from "./pages/Login/Login.jsx";
import Cadastro from "./pages/Cadastro/Cadastro.jsx";
import SobreProjeto from "./pages/SobreProjeto/SobreProjeto.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/tecnologia" element={<Tecnologias />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/cadastro" element={<Cadastro />}/>
        <Route path="/sobreoprojeto" element={<SobreProjeto />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;