import Logo from "./assets/Logo.png";

export default function HomePage() {
  return (
    <div>
      <nav className="Navbar">
        <a href="/">
          <img src={Logo} width={50} alt="Logo" />
        </a>
        <ul>
          <li>Dashboard</li>
          <li>Login</li>
        </ul>
      </nav>
    </div>
  );
}