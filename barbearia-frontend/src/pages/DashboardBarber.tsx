import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../api/api";
import "../styles/DashboardBarber.css";

interface Appointment {
  id: number;
  clientName: string;
  serviceName: string;
  preco: BigDecimal;
  dateTime: string;
  status: string;
}

export function DashboardBarber() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get("/api/appointments/my-month");
        setAppointments(response.data);
      } catch (err) {
        console.error("Erro ao carregar dados do mês: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const totalAgendamentos = appointments.length;

  const totalArrecadado = appointments
    .filter(apt => apt.status === "CONCLUIDO" || apt.status === "PAGO")
    .reduce((sum, apt) => sum + apt.price, 0);

  if (loading) return <div className="cyber-loading">CARREGANDO DADOS...</div>;

  return (
    <div className="barber-page">
        <header style={{ textAlign: 'center' }}>
          <h1 className="barber-title">RELATÓRIO DO BARBEIRO</h1>
          <p className="barber-subtitle">RELATÓRIO MENSAL DE DESEMPENHO</p>
        </header>

        <div className="metrics-grid">
          <div className="metric-box">
            <span className="metric-label">AGENDAMENTOS NO MÊS</span>
            <span className="metric-value">{totalAgendamentos}</span>
          </div>

          <div className="metric-box money">
            <span className="metric-label">ARRECADAÇÃO TOTAL</span>
            <span className="metric-value">
              {totalArrecadado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
        </div>

        <section className="history-box">
          <h2 className="history-title">HISTÓRICO RECENTE</h2>
          {appointments.length === 0 ? (
            <p className="empty-msg">[ SISTEMA: NENHUM DADO ENCONTRADO NO PERÍODO ]</p>
          ) : (
            <table className="cyber-table">
              <thead>
                <tr>
                  <th>CLIENTE</th>
                  <th>SERVIÇO</th>
                  <th>DATA</th>
                  <th>VALOR</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt) => (
                  <tr key={apt.id}>
                    <td style={{ color: '#fff', fontWeight: 'bold' }}>
                      {apt.clientName?.toUpperCase()}
                    </td>
                    <td>{apt.serviceName}</td>
                    <td>{new Date(apt.dateTime).toLocaleDateString('pt-BR')}</td>
                    <td style={{ color: '#39ff14' }}>R$ {apt.price.toFixed(2)}</td>
                    <td>
                      <span className={`status-${apt.status.toLowerCase()}`}>
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <button className="back-btn" onClick={() => window.history.back()}>
          RETORNAR AO SISTEMA
        </button>
      </div>
    );
}