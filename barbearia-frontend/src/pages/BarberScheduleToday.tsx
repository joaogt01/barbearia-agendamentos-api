import { useEffect, useState, useCallback } from "react";
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

export function BarberScheduleToday() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  const fetchToday = useCallback(async () => {
    try {
      const res = await api.get<Appointment[]>("/api/appointments/today");
      setAppointments(res.data);
    } catch {
      setError("Erro ao buscar agenda do dia.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchToday(); }, [fetchToday]);

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      await api.put(`/api/appointments/${id}/status`, { status: newStatus });
      fetchToday();
    } catch {
      setError("Erro ao atualizar status.");
    }
  };

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  }).toUpperCase();

  if (loading) return <div className="cyber-loading">CARREGANDO AGENDA...</div>;

  return (
      <div className="page-container">
        <AdminNavbar />

        <header className="page-header">
          <h1 className="page-title">AGENDA DO DIA</h1>
          <p className="page-subtitle">{today}</p>
        </header>

        {error && <div className="cyber-error-msg">{error}</div>}

        <div className="apt-grid">
          {appointments.length === 0 ? (
              <p className="empty-msg">NENHUM COMPROMISSO PARA HOJE</p>
          ) : (
              appointments.map((apt) => (
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
                      <span className="apt-price">R$ {apt.price.toFixed(2)}</span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                      {apt.status === "CONFIRMADO" && (
                          <button
                              className="btn-success"
                              onClick={() => handleUpdateStatus(apt.id, "CONCLUIDO")}
                          >
                            FINALIZAR
                          </button>
                      )}
                      <span className={`status-badge ${apt.status.toLowerCase()}`}>
                  {apt.status}
                </span>
                    </div>
                  </div>
              ))
          )}
        </div>

        <button className="btn-back" onClick={() => window.history.back()}>
          VOLTAR AO TERMINAL
        </button>
      </div>
  );
}