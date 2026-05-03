import { useEffect, useState } from "react";
import { api } from "../api/api";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/dashboard.css";

interface Appointment {
  id: number;
  clientName: string;
  serviceName: string;
  price: number;
  dateTime: string;
  status: string;
}

export function DashboardBarber() {
  const [monthAppointments, setMonthAppointments] = useState<Appointment[]>([]);
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [monthRes, todayRes] = await Promise.all([
          api.get<Appointment[]>("/api/appointments/my-month"),
          api.get<Appointment[]>("/api/appointments/today"),
        ]);
        setMonthAppointments(monthRes.data);
        setTodayAppointments(todayRes.data);
      } catch {
        setError("Erro ao carregar dados do painel.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      await api.put(`/api/appointments/${id}/status`, { status: newStatus });

      const update = (list: Appointment[]) =>
          list.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt));

      setTodayAppointments(update);
      setMonthAppointments(update);
    } catch {
      setError("Falha ao atualizar status.");
    }
  };

  const totalArrecadado = monthAppointments
      .filter((apt) => apt.status === "CONCLUIDO" || apt.status === "PAGO")
      .reduce((sum, apt) => sum + apt.price, 0);

  if (loading) return <div className="cyber-loading">ACESSANDO A AGENDA...</div>;

  return (
      <div className="page-container">
        <AdminNavbar />

        <header className="page-header">
          <h1 className="page-title">PAINEL DO BARBEIRO</h1>
          <p className="page-subtitle">OPERAÇÕES EM TEMPO REAL</p>
        </header>

        {error && <div className="cyber-error-msg">{error}</div>}

        <h2 className="section-header" style={{ marginBottom: "1rem" }}>
          AGENDAMENTOS DE HOJE
        </h2>
        <div className="apt-grid">
          {todayAppointments.length === 0 ? (
              <p className="empty-msg">[ NENHUM CLIENTE AGENDADO PARA HOJE ]</p>
          ) : (
              todayAppointments.map((apt) => (
                  <div key={apt.id} className={`apt-card status-${apt.status.toLowerCase()}`}>
                    <div className="apt-info">
                <span className="apt-time">
                  {new Date(apt.dateTime).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                      <strong className="apt-client">{apt.clientName.toUpperCase()}</strong>
                      <span className="apt-service">{apt.serviceName}</span>
                    </div>

                    {apt.status === "CONFIRMADO" && (
                        <button
                            className="btn-success"
                            onClick={() => handleUpdateStatus(apt.id, "CONCLUIDO")}
                        >
                          CONCLUIR
                        </button>
                    )}
                  </div>
              ))
          )}
        </div>

        <hr className="cyber-divider" />

        <div className="metrics-row">
          <div className="metric-card">
            <span className="metric-label">TOTAL MENSAL</span>
            <strong className="metric-value">{monthAppointments.length}</strong>
          </div>
          <div className="metric-card metric-card--yellow">
            <span className="metric-label">ARRECADAÇÃO</span>
            <strong className="metric-value" style={{ fontSize: "1.5rem" }}>
              {totalArrecadado.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>
          </div>
        </div>

        <h2 className="section-header section-header--pink" style={{ marginBottom: "1rem" }}>
          HISTÓRICO DO MÊS
        </h2>
        <div style={{ overflowX: "auto" }}>
          <table className="cyber-table">
            <thead>
            <tr>
              <th>CLIENTE</th>
              <th>DATA</th>
              <th>SERVIÇO</th>
              <th>VALOR</th>
              <th>STATUS</th>
            </tr>
            </thead>
            <tbody>
            {monthAppointments.map((apt) => (
                <tr key={apt.id}>
                  <td>{apt.clientName?.toUpperCase()}</td>
                  <td>{new Date(apt.dateTime).toLocaleDateString("pt-BR")}</td>
                  <td>{apt.serviceName}</td>
                  <td style={{ color: "var(--cyber-green)" }}>
                    R$ {apt.price.toFixed(2)}
                  </td>
                  <td>
                  <span className={`status-badge ${apt.status.toLowerCase()}`}>
                    {apt.status}
                  </span>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}