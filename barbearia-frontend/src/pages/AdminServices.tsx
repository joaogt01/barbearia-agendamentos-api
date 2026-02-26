import { useEffect, useState } from "react";
import { api } from "../api/api";
import AdminNavbar from "../components/AdminNavbar";
import "./dashboardClient.css";

interface Service {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  duracaoMinutos: number;
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [duracao, setDuracao] = useState("");

  const fetchServices = async () => {
    try {
      const response = await api.get("/api/services");
      setServices(response.data);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newService = {
        nome,
        descricao,
        preco: parseFloat(preco),
        duracaoMinutos: parseInt(duracao),
      };

      await api.post("/api/services", newService);
      alert("SERVIÇO INSTALADO NO SISTEMA!");

      setNome("");
      setDescricao("");
      setPreco("");
      setDuracao("");
      fetchServices();
    } catch (error) {
      alert("FALHA NA INSTALAÇÃO: Verifique as permissões de ADMIN.");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("DESEJA REALMENTE DELETAR ESTE MÓDULO?")) {
      try {
        await api.delete(`/api/services/${id}`);
        fetchServices();
      } catch (error) {
        alert("ERRO AO DELETAR.");
      }
    }
  };

  return (
    <div className="admin-container">
      <AdminNavbar />

      <div className="admin-content">
        <header className="admin-header">
          <h1 className="glitch-text">GERENCIADOR DE SERVIÇOS</h1>
        </header>

        <section className="admin-form-section">
          <h2>ADICIONAR NOVO SERVIÇO</h2>
          <form onSubmit={handleAddService} className="cyber-form">
            <div className="input-group">
              <input
                type="text" placeholder="NOME DO SERVIÇO"
                value={nome} onChange={(e) => setNome(e.target.value)} required
              />
              <input
                type="number" placeholder="PREÇO (R$)"
                value={preco} onChange={(e) => setPreco(e.target.value)} required
              />
            </div>
            <div className="input-group">
              <input
                type="number" placeholder="DURAÇÃO (MINUTOS)"
                value={duracao} onChange={(e) => setDuracao(e.target.value)} required
              />
              <input
                type="text" placeholder="DESCRIÇÃO BREVE"
                value={descricao} onChange={(e) => setDescricao(e.target.value)} required
              />
            </div>
            <button type="submit" className="btn-save">EXECUTAR</button>
          </form>
        </section>

        <section className="admin-table-section">
          <h2>SERVIÇO ATIVOS</h2>
          <table className="cyber-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NOME</th>
                <th>PREÇO</th>
                <th>DURAÇÃO</th>
                <th>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id}>
                  <td>#{s.id}</td>
                  <td>{s.nome}</td>
                  <td>R$ {s.preco.toFixed(2)}</td>
                  <td>{s.duracaoMinutos} min</td>
                  <td>
                    <button onClick={() => handleDelete(s.id)} className="btn-delete">
                      DELETAR
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}