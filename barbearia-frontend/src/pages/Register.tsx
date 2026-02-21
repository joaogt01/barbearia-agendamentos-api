import { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    await api.post("/auth/register", {
      nome,
      email,
      senha,
      role: "CLIENTE",
    });

    navigate("/");
  }

  return (
    <form onSubmit={handleRegister}>
      <h2>Cadastro</h2>
      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
}
