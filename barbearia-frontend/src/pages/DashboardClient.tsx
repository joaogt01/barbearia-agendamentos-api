import { useEffect, useState, useCallback } from "react";
import { api } from "../api/api";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/dashboard.css";

interface Service {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    duracaoMinutos: number;
}

interface Barber {
    id: number;
    userName: string;
    ativo: boolean;
}

const WORK_SLOTS = [
    "09:00", "10:00", "11:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00",
];

export default function DashboardClient() {
    const [services, setServices]           = useState<Service[]>([]);
    const [barbers, setBarbers]             = useState<Barber[]>([]);
    const [loading, setLoading]             = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [occupiedSlots, setOccupiedSlots] = useState<string[]>([]);

    const [selectedService, setSelectedService] = useState<number | null>(null);
    const [selectedBarber, setSelectedBarber]   = useState<number | null>(null);
    const [appointmentDate, setAppointmentDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [error, setError]               = useState("");
    const [success, setSuccess]           = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesRes, barbersRes] = await Promise.all([
                    api.get<Service[]>("/api/services"),
                    api.get<Barber[]>("/api/barbers"),
                ]);
                setServices(servicesRes.data);
                setBarbers(barbersRes.data.filter((b) => b.ativo));
            } catch {
                setError("Erro ao carregar dados. Recarregue a página.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const fetchOccupied = useCallback(async () => {
        if (!selectedBarber || !appointmentDate) {
            setOccupiedSlots([]);
            return;
        }
        try {
            const res = await api.get(`/api/appointments/barber/${selectedBarber}`, {
                params: { date: appointmentDate },
            });
            const occupied: string[] = res.data.map((app: any) => {
                const date = Array.isArray(app.time)
                    ? new Date(app.time[0], app.time[1] - 1, app.time[2], app.time[3], app.time[4])
                    : new Date(app.time);
                return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
            });
            setOccupiedSlots(occupied);
        } catch {
            setOccupiedSlots([]);
        }
    }, [selectedBarber, appointmentDate]);

    useEffect(() => { fetchOccupied(); }, [fetchOccupied]);

    const handleBooking = async () => {
        if (!selectedService || !selectedBarber || !selectedTime || !appointmentDate) {
            setError("Selecione serviço, barbeiro, data e horário.");
            return;
        }

        setBookingLoading(true);
        setError("");
        setSuccess("");

        try {
            await api.post("/api/appointments", {
                barberId:  selectedBarber,
                serviceId: selectedService,
                time: `${appointmentDate}T${selectedTime}:00`,
            });

            setSuccess("Agendamento realizado com sucesso!");
            setSelectedTime(null);
            await fetchOccupied();
        } catch (err: any) {
            setError(err.response?.data?.message || "Falha ao agendar. Tente novamente.");
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) return <div className="cyber-loading">CARREGANDO SISTEMA...</div>;

    return (
        <div className="page-container">
            <AdminNavbar />

            <header className="page-header">
                <h1 className="page-title">AGENDAMENTO</h1>
                <p className="page-subtitle">SELECIONE O SERVIÇO E HORARIO DE SUA PREFERÊNCIA</p>
            </header>

            {error   && <div className="cyber-error-msg">{error}</div>}
            {success && <div className="cyber-success-msg">{success}</div>}

            <h2 className="section-header" style={{ marginBottom: "1rem" }}>
                1. SERVIÇO
            </h2>
            <div className="selection-grid">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className={`selection-card ${selectedService === service.id ? "selected" : ""}`}
                        onClick={() => setSelectedService(service.id)}
                    >
                        <span className="card-tag">MOD_SERV_{service.id}</span>
                        <h3>{service.nome}</h3>
                        <p className="price">R$ {service.preco.toFixed(2)}</p>
                        <p className="duration">{service.duracaoMinutos} min</p>
                    </div>
                ))}
            </div>

            <h2 className="section-header" style={{ margin: "2rem 0 1rem" }}>
                2. BARBEIRO
            </h2>
            <div className="selection-grid">
                {barbers.length === 0 && <p className="empty-msg">NENHUM BARBEIRO DISPONÍVEL</p>}
                {barbers.map((barber) => (
                    <div
                        key={barber.id}
                        className={`selection-card ${selectedBarber === barber.id ? "selected" : ""}`}
                        onClick={() => {
                            setSelectedBarber(barber.id);
                            setSelectedTime(null);
                        }}
                    >
                        <h3>{barber.userName || "DESCONHECIDO"}</h3>
                        <p style={{ color: "var(--cyber-green)", fontSize: "0.8rem" }}>
                            STATUS: DISPONÍVEL
                        </p>
                    </div>
                ))}
            </div>

            {selectedBarber && (
                <>
                    <h2 className="section-header" style={{ margin: "2rem 0 1rem" }}>
                        3. DATA E HORÁRIO
                    </h2>

                    <div className="cyber-form-group" style={{ maxWidth: 320 }}>
                        <label className="cyber-form-label">DATA DO AGENDAMENTO</label>
                        <input
                            type="date"
                            className="cyber-input"
                            value={appointmentDate}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => {
                                setAppointmentDate(e.target.value);
                                setSelectedTime(null);
                            }}
                        />
                    </div>

                    <div className="time-grid">
                        {WORK_SLOTS.map((time) => {
                            const isOccupied = occupiedSlots.includes(time);
                            return (
                                <button
                                    key={time}
                                    disabled={isOccupied}
                                    className={`time-slot ${isOccupied ? "occupied" : ""} ${
                                        selectedTime === time ? "active" : ""
                                    }`}
                                    onClick={() => setSelectedTime(time)}
                                >
                                    {time}
                                    <span className="slot-status">{isOccupied ? "OCUPADO" : "LIVRE"}</span>
                                </button>
                            );
                        })}
                    </div>
                </>
            )}

            <button
                className="btn-confirm"
                onClick={handleBooking}
                disabled={bookingLoading}
            >
                {bookingLoading ? "PROCESSANDO..." : "EXECUTAR AGENDAMENTO"}
            </button>
        </div>
    );
}