import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import AdminNavbar from "../components/AdminNavbar";
import AdminBarberForm from "../components/AdminBarberForm";
import "../styles/dashboard.css";

interface Barber {
  id: number;
  userName: string;
  userId: number | null;
  ativo: boolean;
  email: string;
  services: unknown[];
}

interface Metrics {
  total: number;
  ativos: number;
  usuarios: number;
}

export default function DashboardAdmin() {
  const [barbers, setBarbers]   = useState<Barber[]>([]);
  const [metrics, setMetrics]   = useState<Metrics>({ total: 0, ativos: 0, usuarios: 0 });
  const [error, setError]       = useState("");

  const fetchDashboardData = useCallback(async () => {
    try {
      const [barbersRes, usersRes] = await Promise.all([
        api.get<Barber[]>("/api/barbers"),
        api.get<unknown[]>("/api/users/role/BARBEIRO"),
      ]);

      const allBarbers = barbersRes.data;
      setBarbers(allBarbers);
      setMetrics({
        total:    allBarbers.length,
        ativos:   allBarbers.filter((b) => b.ativo).length,
        usuarios: usersRes.data.length,
      });
    } catch {
      setError("Erro ao carregar dados do painel.");
    }
  }, []);

  useEffect(() => { fetchDashboardData(); }, [fetchDashboardData]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Deseja realmente desativar este barbeiro?")) return;
    try {
      await api.delete(`/api/barbers/${id}`);
      fetchDashboardData();
    } catch {
      setError("Erro ao desativar barbeiro.");
    }
  };

  return (
      <div className="page-container">
        <AdminNavbar />

        <header className="page-header">
          <h1 className="page-title">PAINEL DE CONTROLE</h1>
          <p className="page-subtitle">SISTEMA ADMIN — BARBERPUNK</p>

          <div className="quick-actions" style={{ marginTop: "1rem" }}>
            <Link to="/admin/servicos" className="btn-outline">
              [ GERENCIAR SERVIÇOS ]
            </Link>
          </div>
        </header>

        {error && <div className="cyber-error-msg">{error}</div>}

        <div className="metrics-row">
          <div className="metric-card">
            <span className="metric-label">TOTAL BARBEIROS</span>
            <strong className="metric-value">{metrics.total}</strong>
          </div>
          <div className="metric-card metric-card--yellow">
            <span className="metric-label">PROFISSIONAIS ATIVOS</span>
            <strong className="metric-value">{metrics.ativos}</strong>
          </div>
          <div className="metric-card">
            <span className="metric-label">USUÁRIOS REGISTRADOS</span>
            <strong className="metric-value">{metrics.usuarios}</strong>
          </div>
        </div>

        <div className="dashboard-grid">
          <section>
            <AdminBarberForm onBarberCreated={fetchDashboardData} />
          </section>
          <section>
            <h2 className="section-header">EQUIPE CADASTRADA</h2>
            <div className="barber-grid">
              {barbers.length === 0 && (
                  <p className="empty-msg">NENHUM BARBEIRO CADASTRADO</p>
              )}
              {barbers.map((b) => (
                  <div key={b.id} className={`barber-card ${b.ativo ? "active" : "inactive"}`}>
                    <div className="barber-info">
                      <h3>{b.userName || "SEM NOME"}</h3>
                      <p>{b.email}</p>
                      <span className={`status-badge ${b.ativo ? "online" : "offline"}`}>
                    {b.ativo ? "ATIVO" : "INATIVO"}
                  </span>
                    </div>

                    {b.ativo && (
                        <button className="btn-danger" onClick={() => handleDelete(b.id)}>
                          DESATIVAR
                        </button>
                    )}
                  </div>
              ))}
            </div>
          </section>
        </div>
      </div>
  );
}