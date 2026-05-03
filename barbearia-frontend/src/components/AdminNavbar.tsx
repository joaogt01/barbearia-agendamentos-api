import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

export default function AdminNavbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const role = user?.role;

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/">BARBERPUNK</Link>
            </div>

            <div className="nav-links">
                {role === "CLIENTE" && (
                    <>
                        <Link to="/dashboard-client">AGENDAR</Link>
                    </>
                )}

                {role === "BARBEIRO" && (
                    <>
                        <Link to="/dashboard-barber">TERMINAL</Link>
                        <Link to="/barber-schedule">AGENDA DO DIA</Link>
                    </>
                )}

                {role === "ADMIN" && (
                    <>
                        <Link to="/dashboard-admin">SISTEMA</Link>
                        <Link to="/admin/servicos">SERVIÇOS</Link>
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