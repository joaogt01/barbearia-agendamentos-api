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

export function DashboardBarber() {
  const [monthAppointments, setMonthAppointments] = useState<Appointment[]>([]);
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [monthRes, todayRes] = await Promise.all([
          api.get("/api/appointments/my-month"),
          api.get("/api/appointments/today")
        ]);

        setMonthAppointments(monthRes.data);
        setTodayAppointments(todayRes.data);
      } catch (err) {
        console.error("Erro ao carregar dados: ", err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      await api.put(`/api/appointments/${id}/status`, { status: newStatus });

      const updateList = (list: Appointment[]) =>
        list.map(apt => apt.id === id ? { ...apt, status: newStatus } : apt);

      setTodayAppointments(updateList(todayAppointments));
      setMonthAppointments(updateList(monthAppointments));
    } catch (err) {
      alert("Falha ao atualizar status no servidor.");
    }
  };

  const totalArrecadado = monthAppointments
    .filter(apt => apt.status === "CONCLUIDO" || apt.status === "PAGO")
    .reduce((sum, apt) => sum + apt.price, 0);

  if (loading) return <div className="cyber-loading">ACESSANDO A AGENDA...</div>;

  return (
    <div className="barber-page">
        <header style={{ textAlign: 'center' }}>
          <h1 className="barber-title">PAINEL DO BARBEIRO</h1>
          <p className="barber-subtitle">OPERAÇÕES EM TEMPO REAL</p>
        </header>

        <section className="today-section">
          <h2 className="history-title" style={{ color: '#00f3ff' }}> AGENDAMENTOS DE HOJE</h2>
          <div className="today-grid">
            {todayAppointments.length === 0 ? (
              <p className="empty-msg">[ NENHUM CLIENTE AGENDADO PARA HOJE ]</p>
            ) : (
              todayAppointments.map(apt => (
                <div key={apt.id} className={`apt-card status-${apt.status.toLowerCase()}`}>
                  <div className="apt-info">
                    <strong>{new Date(apt.dateTime).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</strong>
                    <span>{apt.clientName.toUpperCase()}</span>
                    <small>{apt.serviceName}</small>
                  </div>

                  {apt.status === 'CONFIRMADO' && (
                    <button
                      className="complete-btn"
                      onClick={() => handleUpdateStatus(apt.id, 'CONCLUIDO')}
                    >
                      CONCLUIR
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        <hr className="cyber-divider" />

        <div className="metrics-grid">
          <div className="metric-box">
            <span className="metric-label">TOTAL MENSAL</span>
            <span className="metric-value">{monthAppointments.length}</span>
          </div>

          <div className="metric-box money">
            <span className="metric-label">ARRECADAÇÃO</span>
            <span className="metric-value">
              {totalArrecadado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
        </div>

        <section className="history-box">
          <h2 className="history-title">HISTÓRICO DE ATIVIDADES (MÊS)</h2>
          <table className="cyber-table">
            <thead>
              <tr>
                <th>CLIENTE</th>
                <th>DATA</th>
                <th>VALOR</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {monthAppointments.map((apt) => (
                <tr key={apt.id}>
                  <td>{apt.clientName?.toUpperCase()}</td>
                  <td>{new Date(apt.dateTime).toLocaleDateString('pt-BR')}</td>
                  <td style={{ color: '#39ff14' }}>R$ {apt.price.toFixed(2)}</td>
                  <td><span className={`status-badge ${apt.status.toLowerCase()}`}>{apt.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <button className="back-btn" onClick={() => window.history.back()}>
          DESCONECTAR
        </button>
      </div>
    );
}