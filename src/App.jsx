import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Home from "./pages/Home/Home.jsx"
import Navbar from "./components/Navbar/Navbar.jsx";
import Contato from "./pages/Contato/contato.jsx"
import Tecnologias from "./pages/Tecnologias/Tecnologias.jsx"
import Footer from "./components/Footer/Footer.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/tecnologia" element={<Tecnologias />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;