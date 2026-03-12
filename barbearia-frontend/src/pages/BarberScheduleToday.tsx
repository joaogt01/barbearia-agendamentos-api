import { useEffect, useState } from "react";
import { api } from "../api/api";
import "../styles/DashboardBarber.css";

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

  const fetchToday = async () => {
    try {
      const response = await api.get("/api/appointments/today");
      setAppointments(response.data);
    } catch (err) {
      console.error("Erro ao buscar agenda:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToday();
  }, []);

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      await api.put(`/api/appointments/${id}/status`, { status: newStatus });
      fetchToday();
    } catch (err) {
      alert("Erro ao atualizar status.");
    }
  };

  return (
    <div className="barber-page">
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="barber-title">AGENDA DO DIA</h1>
        <p className="barber-subtitle">
          {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' }).toUpperCase()}
        </p>
      </header>

      <div className="today-grid">
        {appointments.length === 0 ? (
          <div className="empty-msg-container">
            <p className="empty-msg"> NENHUM COMPROMISSO PARA HOJE </p>
          </div>
        ) : (
          appointments.map((apt) => (
            <div key={apt.id} className={`apt-card status-${apt.status.toLowerCase()}`}>
              <div className="apt-info">
                <span className="apt-time">
                  {new Date(apt.dateTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </span>
                <strong className="apt-client">{apt.clientName.toUpperCase()}</strong>
                <span className="apt-service">{apt.serviceName}</span>
                <span className="apt-price">R$ {apt.price.toFixed(2)}</span>
              </div>

              <div className="apt-actions">
                {apt.status === "CONFIRMADO" && (
                  <button
                    className="complete-btn"
                    onClick={() => handleUpdateStatus(apt.id, "CONCLUIDO")}
                  >
                    FINALIZAR
                  </button>
                )}
                <span className={`status-text ${apt.status.toLowerCase()}`}>
                  {apt.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <button className="back-btn" onClick={() => window.history.back()}>
        VOLTAR AO TERMINAL
      </button>
    </div>
  );
}