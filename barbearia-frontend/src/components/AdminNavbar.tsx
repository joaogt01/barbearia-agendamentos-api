import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role")?.toUpperCase();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>RASPA COCO</Link>
      </div>

      <div className="nav-links">

        <Link className="nav-links" to="/">HOME</Link>
        {role === "CLIENTE" && (
          <>
            <Link to="/agendar">NOVO AGENDAMENTO</Link>
            <Link to="/meus-agendamentos">MINHA AGENDA</Link>
          </>
        )}


        {role === "BARBEIRO" && (
          <>
            <Link to="/dashboard-barber">TERMINAL BARBEIRO</Link>
            <Link to="/barber-schedule">AGENDA DO DIA</Link>
          </>
        )}


        {role === "ADMIN" && (
          <>
            <Link to="/dashboard-admin">SISTEMA</Link>
            <Link to="/admin/barbers">EQUIPE</Link>
            <Link to="/admin/services">SERVIÇOS</Link>
          </>
        )}
      </div>

      <div className="nav-auth">
        {isAuthenticated ? (
          <button className="logout-btn" onClick={handleLogout}>
            DESCONECTAR
          </button>
        ) : (
          <Link to="/login" className="login-btn-nav">ENTRAR</Link>
        )}
      </div>
    </nav>
  );
}