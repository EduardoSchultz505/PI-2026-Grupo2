import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./Home.jsx"
import Navbar from "./Navbar.jsx";
import Contato from "./contato.jsx"
import Tecnologia from "./Tecnologia.jsx"
import Footer from "./Footer.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/tecnologia" element={<Tecnologia />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;