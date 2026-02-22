import { useState } from "react";
import { api, setAuthToken } from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true)
    setError("")

    try {
      const response = await api.post("/auth/login", {
        email,
        senha
      });

      const {token, role}  = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      api.defaults.headers.Authorization = `Bearer ${token}`;

      if (role === "ADMIN") {
            navigate("/dashboard-admin");
          } else if (role === "CLIENTE") {
            navigate("/dashboard-client");
          }

    } catch (err: any) {
        setError("Credenciais inválidas")
      } finally {
          setLoading(false)
      }
  }

  return (
      <div className="login-page">
            <div className="login-box">
              <h1 className="login-title">LOGIN</h1>

              <form onSubmit={handleLogin}>
                <div className="login-field">
                  <label>ID_USUARIO (EMAIL)</label>
                  <input
                    type="email"
                    placeholder="seuemail@nightcity.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="login-field">
                  <label>CHAVE_ACESSO (SENHA)</label>
                  <input
                    type="password"
                    placeholder="********"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="login-btn">
                  ESTABELECER_CONEXAO
                </button>
              </form>

              <div className="login-footer">
                AINDA NÃO É UM MERCENÁRIO? <Link to="/register">CRIAR_CONTA</Link>
              </div>
            </div>
          </div>
  );
}