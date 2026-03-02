import { useState } from "react";
import { api } from "../api/api";
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
         email: email,
         senha: senha
       });

       const { token, role } = response.data;

       console.log("Resposta do servidor:", response.data);

       localStorage.clear();
       localStorage.setItem("token", token);
       localStorage.setItem("role", role);

       api.defaults.headers.Authorization = `Bearer ${token}`;

       const normalizedRole = role ? role.toUpperCase() : "";

       if (normalizedRole === "ADMIN") {
         navigate("/dashboard-admin");
       } else if (normalizedRole === "BARBEIRO" || normalizedRole === "ROLE_BARBEIRO") {
         navigate("/dashboard-barber");
       } else if (normalizedRole === "CLIENTE" || normalizedRole === "ROLE_CLIENTE") {
         navigate("/dashboard-client");
       } else {
         console.error("Role não reconhecida ou ausente:", role);
         setError("Erro de permissão: Perfil não identificado.");
       }

     } catch (err: any) {
       setError("Credenciais inválidas ou erro no servidor");
     }
  }

  return (
      <div className="login-page">
            <div className="login-box">
              <h1 className="login-title">LOGIN</h1>

              <form onSubmit={handleLogin}>
                <div className="login-field">
                  <label>EMAIL</label>
                  <input
                    type="email"
                    placeholder="seuemail@nightcity.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="login-field">
                  <label>SENHA</label>
                  <input
                    type="password"
                    placeholder="********"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="login-btn">
                  ENTRAR
                </button>
              </form>

              <div className="login-footer">
                AINDA NÃO É REGISTRADO? <Link to="/register">CRIAR CONTA</Link>
              </div>
            </div>
          </div>
  );
}