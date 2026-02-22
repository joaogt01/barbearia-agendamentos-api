import { Link, useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="admin-navbar">
          <Link to="/admin" className="nav-logo">
            RASPA COCO
          </Link>

          <ul className="nav-links">
            <li><Link to="/admin" className="nav-link">Dashboard</Link></li>
            <li><Link to="/admin/servicos" className="nav-link">Serviços</Link></li>
            <li><Link to="/admin/agendamentos" className="nav-link">Agenda</Link></li>
          </ul>

          <button onClick={handleLogout} className="logout-btn">
            LOGOUT
          </button>
        </nav>
  );
}