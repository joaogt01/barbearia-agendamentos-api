import { useEffect, useState } from "react";
import { api } from "../api/api";
import AdminNavbar from "../components/AdminNavbar"
import "../pages/dashboardClient.css";

interface Service {
  id: number;
  nome: string;
  preco: number;
  duracao: number;
}

interface Barber {
  id: number;
  user: { nome: string };
  ativo: boolean;
}

export default function DashboardClient() {
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, barbersRes] = await Promise.all([
          api.get("/api/services"),
          api.get("/api/barbers")
        ]);
        setServices(servicesRes.data);
        setBarbers(barbersRes.data.filter((b: Barber) => b.ativo));
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="client-container">
      <AdminNavbar />

      <header className="client-header">
        <h1>SISTEMA DE AGENDAMENTO</h1>
        <p>BEM-VINDO A BARBEARIA. SELECIONE SEU UPGRADE VISUAL.</p>
      </header>

      <h2 className="section-subtitle"> SERVIÇOS DISPONÍVEIS</h2>
      <main className="selection-grid">
        {services.length === 0 && <p>Carregando serviços...</p>}
        {services.map((service) => (
          <section key={service.id} className="selection-card">
            <span style={{color: 'var(--cyber-blue)', fontSize: '0.6rem'}}>MODULO SERVICO_{service.id}</span>
            <h3>{service.nome}</h3>
            <p>CRÉDITOS: ED$ {service.preco.toFixed(2)}</p>
            <p>TEMPO: {service.duracao}min</p>
          </section>
        ))}
      </main>

      <h2 className="section-subtitle" style={{marginTop: '2rem'}}>BARBEIROS</h2>
      <main className="selection-grid">
        {barbers.length === 0 && <p>Buscando operativos...</p>}
        {barbers.map((barber) => (
          <section key={barber.id} className="selection-card">
            <span style={{color: 'var(--cyber-blue)', fontSize: '0.6rem'}}>BARBER_CHIP_{barber.id}</span>
            <h3>{barber.user?.nome || "DESCONHECIDO"}</h3>
            <p>STATUS: DISPONÍVEL</p>
          </section>
        ))}
      </main>

      <button className="btn-confirm-appointment">
        EXECUTAR AGENDAMENTO
      </button>
    </div>
  );
}