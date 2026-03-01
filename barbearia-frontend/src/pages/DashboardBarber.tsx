import { useEffect, useState } from "react";
import axios from "axios";
import "./DashboardBarber.css";

interface Appointment = {
  id: number;
  clientName: string;
  serviceName: string;
  time: string | number[];
  status: "PENDING" | "CONFIRMED" | "DONE";
};

export function DashboardBarber() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Appointment[]>(
        "http://localhost:8080/api/appointments/today",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAppointments(response.data);
    } catch (err) {
      console.error("Erro ao carregar agendamentos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const dateObj = Array.isArray(time)
        ? new Date(time[0], time[1] - 1, time[2], time[3], time[4])
        : new Date(time);

      return isNaN(dateObj.getTime())
        ? "DATA INVÁLIDA"
        : dateObj.toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });
    };

  const updateStatus = async (id: number, status: Appointment["status"]) => {
    try {
      await axios.put(
        `http://localhost:8080/api/appointments/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
    }
  };

  return (
    <div className="barber-dashboard-container">
      <header className="barber-dashboard-header">
          <h1>OPERATIVE TERMINAL</h1>
          <p>ORDENS DE SERVIÇO AGENDADAS PARA HOJE</p>
      </header>

      {loading ? (
          <div className="cyber-loading">SCANNING DATABASE...</div>
          ) : appointments.length === 0 ? (
            <div className="empty-state">NENHUMA ATIVIDADE DETECTADA PARA HOJE.</div>
          ) : (
            <div className="appointments-grid">
              {appointments.map((a) => (
                <div key={a.id} className={`appointment-card status-${a.status.toLowerCase()}`}>
                  <div className="card-glitch-effect"></div>
                  <div className="appointment-header">
                    <span className="id-tag">#ID_{a.id}</span>
                    <span className={`status-badge ${a.status.toLowerCase()}`}>
                      {a.status}
                    </span>
                  </div>

                  <div className="card-main-info">
                    <h2>{a.clientName}</h2>
                    <p className="service-text">MISSÃO: <strong>{a.serviceName}</strong></p>
                    <div className="time-display">
                      <span className="icon">🕒</span> {formatDateTime(a.time)}
                    </div>
                  </div>

                  <div className="card-actions">
                    {a.status === "PENDING" && (
                      <button className="btn-action confirm" onClick={() => updateStatus(a.id, "CONFIRMED")}>
                        CONFIRMAR INÍCIO
                      </button>
                    )}
                    {a.status === "CONFIRMED" && (
                      <button className="btn-action done" onClick={() => updateStatus(a.id, "DONE")}>
                        FINALIZAR SERVIÇO
                      </button>
                    )}
                    {a.status === "DONE" && (
                       <div className="completed-msg">SERVIÇO CONCLUÍDO</div>
                    )}
                  </div>
                </div>
              ))}
          </div>
          )}
      </div>
  );
}