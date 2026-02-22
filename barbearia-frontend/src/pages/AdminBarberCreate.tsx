import { useState } from "react";
import { api } from "../api/api";

export default function AdminCreateBarber() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [serviceIds, setServiceIds] = useState<number[]>([1, 2]);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    try {
      // Passo 1: Cria o Usuário
      const userRes = await api.post("/auth/register", {
        nome,
        email,
        senha,
        role: "BARBEIRO"
      });


      const userId = userRes.data.userId;

      await api.post("/api/barbers", {
        userId: userId,
        serviceIds: serviceIds
      });

      alert("Barbeiro cadastrado com sucesso!");
    } catch (err: any) {
      alert("Erro ao cadastrar: " + (err.response?.data?.message || "Erro desconhecido"));
    }
  }

  return (
    <div className="cyber-card">
      <h2 className="cyber-title">CADASTRAR BARBEIRO</h2>
      <form onSubmit={handleRegister}>
        <input className="cyber-input" placeholder="NOME" value={nome} onChange={e => setNome(e.target.value)} />
        <input className="cyber-input" placeholder="EMAIL" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="cyber-input" type="password" placeholder="SENHA" value={senha} onChange={e => setSenha(e.target.value)} />
        <button className="cyber-button" type="submit">SALVAR BARBEIRO</button>
      </form>
    </div>
  );
}