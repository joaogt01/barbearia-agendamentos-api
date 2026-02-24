import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import "../styles/dashboard.css";
import AdminBarberForm from "../components/AdminBarberForm";
import AdminNavbar from "../components/AdminNavbar";


interface Barber {
  id: number;
  user: {
    id: number;
    nome: string;
    email: string;
  };
  ativo: boolean;
}

export default function DashboardAdmin() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [metrics, setMetrics] = useState({ users: 0, active: 0 });

  const fetchDashboardData = async () => {
    try {

      const [barbersRes, usersRes] = await Promise.all([
        api.get("/api/barbers"),
        api.get("/api/users/role/BARBEIRO")
      ]);

      setBarbers(barbersRes.data);
      setMetrics({
        users: usersRes.data.length,
        active: barbersRes.data.filter((b: Barber) => b.ativo).length
      });
    } catch (err) {
      console.error("Erro ao carregar dados do dashboard:", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente desativar este barbeiro?")) return;
    try {
      await api.delete(`/api/barbers/${id}`);
      fetchDashboardData();
    } catch (err) {
      alert("Erro ao desativar barbeiro");
    }
  };

  return (
    <div className="admin-container">
      <AdminNavbar />

      <header className="dashboard-header">
        <h1 className="admin-title">PAINEL DE CONTROLE</h1>

        <div className="admin-quick-actions">
                   <Link to="/admin/servicos" className="action-btn-neon">
                     [ GERENCIAR SERVIÇOS ]
                   </Link>

                   <button className="action-btn-neon disabled" disabled>
                     [ AGENDA COMPLETA ]
                   </button>
                </div>
      </header>


      <div className="metrics">
        <div className="metric-card">
          <span className="label">Total Barbeiros = </span>
          <strong className="value">{barbers.length}</strong>
        </div>
        <div className="metric-card">
          <span className="label">Profissionais Ativos = </span>
          <strong className="value neon-text">{metrics.active}</strong>
        </div>
        <div className="metric-card">
          <span className="label">Usuários = </span>
          <strong className="value">{metrics.users}</strong>
        </div>
      </div>

      <div className="dashboard-content">

        <section className="form-section">
          <AdminBarberForm onBarberCreated={fetchDashboardData} />
        </section>


        <section className="list-section">
          <h2 className="section-subtitle">EQUIPE CADASTRADA</h2>
          <div className="barber-grid">
            {barbers.length === 0 && <p className="empty-msg">Nenhum barbeiro cadastrado.</p>}
            {barbers.map((b) => (
              <div key={b.id} className={`barber-card ${b.ativo ? "active" : "inactive"}`}>
                <div className="barber-info">
                  <h3>{b.user?.nome}</h3>
                  <p>{b.user?.email}</p>
                  <span className={`status-badge ${b.ativo ? "online" : "offline"}`}>
                    {b.ativo ? "ATIVO" : "INATIVO"}
                  </span>
                </div>

                {b.ativo && (
                  <button className="delete-btn" onClick={() => handleDelete(b.id)}>
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