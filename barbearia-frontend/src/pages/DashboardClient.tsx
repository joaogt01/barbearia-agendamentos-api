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
  const [occupiedSlots, setOccupiedSlots] = useState<string[]>([]);

  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<number | null>(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const workSlots = [
      "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
    ];

  useEffect(() => {
    const fetchData = async () => {
      try {
          console.log("Iniciando busca de dados no Backend...");
        const [servicesRes, barbersRes] = await Promise.all([
          api.get("/api/services"),
          api.get("/api/barbers")
        ]);
        setServices(servicesRes.data);
        setBarbers(barbersRes.data.filter((b: Barber) => b.ativo));
        console.log("Dados carregados com sucesso!");
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
          setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
      const fetchSchedule = async () => {
        if (!selectedBarber) {
          setOccupiedSlots([]);
          return;
        }
        try {
          const res = await api.get(`/api/appointments/barber/${selectedBarber}`);
          const occupied = res.data.map((app: any) => {
              const date = Array.isArray(app.time)
                  ? new Date(app.time[0], app.time[1]-1, app.time[2], app.time[3], app.time[4])
                  : new Date(app.time);
              return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
          });
          setOccupiedSlots(occupied);
        } catch (err) {
          console.error("Erro ao carregar agenda:", err);
        }
      };
      fetchSchedule();
    }, [selectedBarber]);

  const handleBooking = async () => {
      if (!selectedService || !selectedBarber || !selectedTime) {
        alert("SELECIONE UM SERVIÇO UM BARBEIRO E A DATA PARA PROSSEGUIR.");
        return;
      }
      try {
          const today = new Date().toISOString().split('T')[0];
          const payload = {
              barberId: selectedBarber,
              serviceId: selectedService,
              time: `${today}T${selectedTime}:00`
            };
          await api.post("/api/appointments", payload);

          alert("AGENDAMENTO REALIZADO COM SUCESSO!");

          setSelectedTime(null);
          const res = await api.get(`/api/appointments/barber/${selectedBarber}`);
          setOccupiedSlots(res.data.map((app: any) => {
              const date = new Date(app.time);
              return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            }));
          } catch (err: any) {
            alert("ERRO: " + (err.response?.data?.message || "Falha ao agendar"));
          } finally {
              setLoading(false);
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
          <section
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
          <section key={barber.id} className={`selection-card ${selectedBarber === barber.id ? "selected" : ""}`}
             onClick={() => setSelectedBarber(barber.id)}>
            <span style={{color: 'var(--cyber-blue)', fontSize: '0.6rem'}}></span>
            <h3>{barber.userName || "DESCONHECIDO"}</h3>
            <p>STATUS: DISPONÍVEL</p>
          </section>
        ))}
      </main>

      {selectedBarber && (
        <>
          <h2 className="section-subtitle">3. HORÁRIOS DISPONÍVEIS PARA ESSE BARBEIRO HOJE</h2>
          <div className="time-grid">
            {workSlots.map(time => {
              const isOccupied = occupiedSlots.includes(time);
              return (
                <button
                  key={time}
                  disabled={isOccupied}
                  className={`time-slot ${isOccupied ? 'occupied' : ''} ${selectedTime === time ? 'active' : ''}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                  <span className="slot-status">{isOccupied ? 'OCUPADO' : 'LIVRE'}</span>
                </button>
              );
            })}
          </div>
        </>
      )}

      <button className="btn-confirm-appointment" onClick={handleBooking}>
        EXECUTAR AGENDAMENTO
      </button>
    </div>
  );
}