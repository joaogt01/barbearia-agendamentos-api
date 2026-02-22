import { useState } from "react";
import { api } from "../api/api";
import { useNavigate, Link } from "react-router-dom";

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
        senha,
      });

      const token = response.data.token

      localStorage.setItem("token", token);

      api.defaults.headers.Authorization = 'Bearer ${token}'

      navigate("/dashboard");
    } catch (err: any) {
        setError("Credenciais inválidas")
      } finally {
          setLoading(false)
      }
  }

  return (
      <div className="cyber-bg">
            <form className="cyber-card" onSubmit={handleLogin}>
              <h1 className="cyber-title">LOGIN</h1>

              <input
                className="cyber-input"
                type="email"
                placeholder="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="cyber-input"
                type="senha"
                placeholder="SENHA"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />

              <button className="cyber-button" type="submit">
                ENTRAR
              </button>

              <div className="cyber-link">
                <Link to="/register">CRIAR CONTA</Link>
              </div>
            </form>
          </div>
  );
}