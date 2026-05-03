import { useState } from "react";
import { api } from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail]     = useState("");
    const [senha, setSenha]     = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { data } = await api.post("/auth/login", { email, senha });
            const { token, role } = data;

            login(token, role);

            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            const normalizedRole = role.replace("ROLE_", "").toUpperCase();

            if (normalizedRole === "ADMIN")           navigate("/dashboard-admin");
            else if (normalizedRole === "BARBEIRO")   navigate("/dashboard-barber");
            else if (normalizedRole === "CLIENTE")    navigate("/dashboard-client");
            else setError("Perfil não reconhecido. Contate o suporte.");
        } catch (err: any) {
            setError(
                err.response?.data?.message || "Credenciais inválidas ou erro no servidor."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-box auth-box--login">
                <h1 className="auth-title">LOGIN</h1>

                {error && <div className="cyber-error-msg">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="auth-field">
                        <label htmlFor="email">EMAIL</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="seuemail@nightcity.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="senha">SENHA</label>
                        <input
                            id="senha"
                            type="password"
                            placeholder="••••••••"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? "AUTENTICANDO..." : "ENTRAR"}
                    </button>
                </form>

                <div className="auth-footer">
                    AINDA NÃO É REGISTRADO?
                    <Link to="/register">CRIAR CONTA</Link>
                </div>
            </div>
        </div>
    );
}