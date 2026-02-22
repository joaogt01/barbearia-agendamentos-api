import { useState } from "react";
import { api } from "../api/api";
import { useNavigate, Link } from "react-router-dom"

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("CLIENTE")

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        nome,
        email,
        senha,
        role: "CLIENTE",
      });

      alert("Cadastro realizado!");
      window.location.href = "/login"
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar");
    }
  }

  return (
     <div className="cyber-bg">
          <form className="cyber-card" onSubmit={handleRegister}>
            <h1 className="cyber-title">REGISTRAR</h1>

            <input
              className="cyber-input"
              type="text"
              placeholder="NOME"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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
              CRIAR CONTA
            </button>

            <div className="cyber-link">
              <Link to="/">JÁ TENHO CONTA</Link>
            </div>
          </form>
        </div>
  );
}

export default Register;