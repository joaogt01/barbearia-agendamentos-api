import { useState, useEffect, useCallback } from "react";
import { api } from "../api/api";
import "../styles/dashboard.css";

interface User {
  id: number;
  nome: string;
  email: string;
}

interface Service {
  id: number;
  nome: string;
  preco: number;
}

interface Props {
  onBarberCreated?: () => void;
}

export default function AdminBarberForm({ onBarberCreated }: Props) {
  const [availableUsers, setAvailableUsers]       = useState<User[]>([]);
  const [availableServices, setAvailableServices] = useState<Service[]>([]);
  const [selectedUserId, setSelectedUserId]       = useState("");
  const [selectedServices, setSelectedServices]   = useState<number[]>([]);
  const [loading, setLoading]                     = useState(false);
  const [error, setError]                         = useState("");
  const [success, setSuccess]                     = useState("");

  const fetchData = useCallback(async () => {
    try {
      const [usersRes, servicesRes] = await Promise.all([
        api.get<User[]>("/api/users/available-users"),
        api.get<Service[]>("/api/services"),
      ]);
      setAvailableUsers(usersRes.data);
      setAvailableServices(servicesRes.data);
    } catch {
      setError("Erro ao carregar dados. Tente novamente.");
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleCheckboxChange = (serviceId: number) => {
    setSelectedServices((prev) =>
        prev.includes(serviceId)
            ? prev.filter((id) => id !== serviceId)
            : [...prev, serviceId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId) {
      setError("Selecione um usuário.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.post("/api/barbers", {
        userId: Number(selectedUserId),
        serviceIds: selectedServices,
      });

      setSuccess("Perfil profissional criado com sucesso!");
      setSelectedUserId("");
      setSelectedServices([]);

      await fetchData();
      onBarberCreated?.();
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao salvar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="cyber-card">
        <h2 className="section-header">CONFIGURAR BARBEIRO</h2>

        {error   && <div className="cyber-error-msg">{error}</div>}
        {success && <div className="cyber-success-msg">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="cyber-form-group">
            <label className="cyber-form-label">SELECIONE O PROFISSIONAL</label>
            <select
                className="cyber-select"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                required
            >
              <option value="">— Clique para selecionar —</option>
              {availableUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.nome} ({user.email})
                  </option>
              ))}
            </select>
          </div>

          <div className="cyber-form-group">
            <label className="cyber-form-label">SERVIÇOS DO BARBEIRO</label>
            <div className="checkbox-grid">
              {availableServices.map((service) => (
                  <label key={service.id} className="checkbox-item">
                    <input
                        type="checkbox"
                        checked={selectedServices.includes(service.id)}
                        onChange={() => handleCheckboxChange(service.id)}
                    />
                    <span>{service.nome}</span>
                    <small style={{ color: "var(--cyber-green)", marginLeft: "auto" }}>
                      R$ {service.preco.toFixed(2)}
                    </small>
                  </label>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "SALVANDO..." : "VINCULAR BARBEIRO"}
          </button>
        </form>
      </div>
  );
}