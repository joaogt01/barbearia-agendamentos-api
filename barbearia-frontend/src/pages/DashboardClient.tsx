import { useEffect, useState } from "react";
import { api } from "../api/api";
import AdminNavbar from "../components/AdminNavbar"
import "../pages/dashboardClient.css";

interface Service {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  duracaoMinutos: number;
}

interface Barber {
  id: number;
  user: { nome: string };
  ativo: boolean;
}

export default function DashboardClient() {
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<number | null>(null);
  const [appointmentDate, setAppointmentDate] = useState("");

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

  const handleBooking = () => {
      if (!selectedService || !selectedBarber || !appointmentDate) {
        alert("SELECIONE UM SERVIÇO UM BARBEIRO E A DATA PARA PROSSEGUIR.");
        return;
      }
      try {
          const payload = {
              barberId: selectedBarber,
              serviceId: selectedService,
              time: appointmentDate
            };
          await api.post("/api/appointments", payload);

            alert("AGENDAMENTO REALIZADO COM SUCESSO!");


            setSelectedService(null);
            setSelectedBarber(null);
            setAppointmentDate("");

          } catch (err: any) {
            console.error("Erro ao agendar:", err);
            const msg = err.response?.data?.message || "Horário indisponível ou erro no servidor.";
            alert("FALHA NO AGENDAMENTO: " + msg);
          }
        };

        if (loading) return <div className="loading">CARREGANDO SISTEMA...</div>;

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
            key={service.id}
              className={`selection-card ${selectedService === service.id ? "selected" : ""}`}
              onClick={() => setSelectedService(service.id)}
              >
              <span className="card-tag">MOD_SERV_{service.id}</span>
              <h3>{service.nome}</h3>
              <p className="price">R$ {service.preco.toFixed(2)}</p>
              <p className="time"> {service.duracaoMinutos} min</p>
          </section>
        ))}
      </main>

      <h2 className="section-subtitle" style={{marginTop: '2rem'}}>BARBEIROS</h2>
      <main className="selection-grid">
        {barbers.length === 0 && <p>Buscando operativos...</p>}
        {barbers.map((barber) => (
          <section key={barber.id} className="selection-card">
            <span style={{color: 'var(--cyber-blue)', fontSize: '0.6rem'}}></span>
            <h3>{barber.userName || "DESCONHECIDO"}</h3>
            <p>STATUS: DISPONÍVEL</p>
          </section>
        ))}
      </main>

      <h2 className="section-subtitle" style={{marginTop: '2rem'}}>DEFINIR CRONOGRAMA</h2>
            <div className="date-input-wrapper">
              <input
                type="datetime-local"
                className="cyber-input"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>


      <button className="btn-confirm-appointment" onClick={handleBooking}>
        EXECUTAR AGENDAMENTO
      </button>
    </div>
  );
}