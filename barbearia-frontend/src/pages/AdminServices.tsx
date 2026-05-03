import { useEffect, useState, useCallback } from "react";
import { api } from "../api/api";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/dashboard.css";

interface Service {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  duracaoMinutos: number;
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [nome, setNome]         = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco]       = useState("");
  const [duracao, setDuracao]   = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState("");

  const fetchServices = useCallback(async () => {
    try {
      const res = await api.get<Service[]>("/api/services");
      setServices(res.data);
    } catch {
      setError("Erro ao buscar serviços.");
    }
  }, []);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.post("/api/services", {
        nome,
        descricao,
        preco: parseFloat(preco),
        duracaoMinutos: parseInt(duracao),
      });

      setSuccess("Serviço adicionado com sucesso!");
      setNome(""); setDescricao(""); setPreco(""); setDuracao("");
      fetchServices();
    } catch {
      setError("Falha ao adicionar serviço. Verifique as permissões.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Deseja realmente deletar este serviço?")) return;
    try {
      await api.delete(`/api/services/${id}`);
      fetchServices();
    } catch {
      setError("Erro ao deletar serviço.");
    }
  };

  return (
      <div className="page-container">
        <AdminNavbar />

        <header className="page-header">
          <h1 className="page-title">GERENCIADOR DE SERVIÇOS</h1>
          <p className="page-subtitle">ADMINISTRAÇÃO — MÓDULOS ATIVOS</p>
        </header>

        {error   && <div className="cyber-error-msg">{error}</div>}
        {success && <div className="cyber-success-msg">{success}</div>}

        <div className="admin-form-section">
          <h2>ADICIONAR NOVO SERVIÇO</h2>
          <form onSubmit={handleAdd}>
            <div className="input-row">
              <div className="cyber-form-group">
                <label className="cyber-form-label">NOME DO SERVIÇO</label>
                <input
                    type="text"
                    className="cyber-input"
                    placeholder="Ex: CORTE DEGRADÊ"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
              </div>
              <div className="cyber-form-group">
                <label className="cyber-form-label">PREÇO (R$)</label>
                <input
                    type="number"
                    className="cyber-input"
                    placeholder="Ex: 45.00"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    min="0"
                    step="0.01"
                    required
                />
              </div>
            </div>

            <div className="input-row">
              <div className="cyber-form-group">
                <label className="cyber-form-label">DURAÇÃO (MINUTOS)</label>
                <input
                    type="number"
                    className="cyber-input"
                    placeholder="Ex: 30"
                    value={duracao}
                    onChange={(e) => setDuracao(e.target.value)}
                    min="1"
                    required
                />
              </div>
              <div className="cyber-form-group">
                <label className="cyber-form-label">DESCRIÇÃO</label>
                <input
                    type="text"
                    className="cyber-input"
                    placeholder="Breve descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: "0.5rem" }}>
              {loading ? "SALVANDO..." : "ADICIONAR SERVIÇO"}
            </button>
          </form>
        </div>

        <h2 className="section-header" style={{ marginBottom: "1rem" }}>
          SERVIÇOS ATIVOS
        </h2>
        <div style={{ overflowX: "auto" }}>
          <table className="cyber-table">
            <thead>
            <tr>
              <th>ID</th>
              <th>NOME</th>
              <th>PREÇO</th>
              <th>DURAÇÃO</th>
              <th>DESCRIÇÃO</th>
              <th>AÇÕES</th>
            </tr>
            </thead>
            <tbody>
            {services.map((s) => (
                <tr key={s.id}>
                  <td>#{s.id}</td>
                  <td>{s.nome}</td>
                  <td style={{ color: "var(--cyber-green)" }}>R$ {s.preco.toFixed(2)}</td>
                  <td>{s.duracaoMinutos} min</td>
                  <td style={{ color: "#666" }}>{s.descricao}</td>
                  <td>
                    <button className="btn-danger" onClick={() => handleDelete(s.id)}>
                      DELETAR
                    </button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}