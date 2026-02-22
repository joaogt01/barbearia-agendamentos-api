import { useEffect, useState } from "react";
import axios from "axios";
import "./DashboardBarber.css";

type Appointment = {
  id: number;
  barberName: string;
  clientName: string;
  serviceName: string;
  time: string;
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
            Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT do login
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
    <div className="dashboard-container">
      <h1>💈 Painel do Barbeiro</h1>
      {loading ? (
        <div className="loading">Carregando agendamentos...</div>
      ) : appointments.length === 0 ? (
        <div className="empty">Nenhum agendamento para hoje.</div>
      ) : (
        <div className="appointments-grid">
          {appointments.map((a) => (
            <div key={a.id} className="appointment-card">
              <div className="appointment-header">
                <h2>{a.clientName}</h2>
                <span className={`status ${a.status.toLowerCase()}`}>
                  {a.status}
                </span>
              </div>
              <p>
                Serviço: <strong>{a.serviceName}</strong>
              </p>
              <p>
                Horário: <strong>{a.time}</strong>
              </p>
              <div className="buttons">
                {a.status === "PENDING" && (
                  <button onClick={() => updateStatus(a.id, "CONFIRMED")}>
                    Confirmar
                  </button>
                )}
                {a.status === "CONFIRMED" && (
                  <button onClick={() => updateStatus(a.id, "DONE")}>
                    Concluir
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}