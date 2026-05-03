import { useState } from "react";
import { api } from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

export default function Register() {
    const navigate = useNavigate();

    const [nome, setNome]         = useState("");
    const [email, setEmail]       = useState("");
    const [senha, setSenha]       = useState("");
    const [loading, setLoading]   = useState(false);
    const [error, setError]       = useState("");

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await api.post("/auth/register", { nome, email, senha, role: "CLIENTE" });
            navigate("/login");
        } catch (err: any) {
            setError(
                err.response?.data?.message || "E-mail já cadastrado ou dados inválidos."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-box auth-box--register">
                <h1 className="auth-title">CRIAR PERFIL</h1>

                {error && <div className="cyber-error-msg">{error}</div>}

                <form onSubmit={handleRegister}>
                    <div className="auth-field">
                        <label htmlFor="nome">NOME</label>
                        <input
                            id="nome"
                            type="text"
                            placeholder="Ex: David Martinez"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="email">EMAIL</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="david@edgerunners.com"
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
                            autoComplete="new-password"
                        />
                    </div>

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? "PROCESSANDO..." : "CRIAR"}
                    </button>
                </form>

                <div className="auth-footer">
                    JÁ ESTÁ NA REDE?
                    <Link to="/login">FAZER LOGIN</Link>
                </div>
            </div>
        </div>
    );
}