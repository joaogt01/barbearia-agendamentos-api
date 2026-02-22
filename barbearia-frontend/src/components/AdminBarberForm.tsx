import { useState, useEffect } from "react";
import { api } from "../api/api";

export default function AdminBarberForm({ onBarberCreated }: { onBarberCreated: () => void }) {
  const [availableUsers, setAvailableUsers] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const [usersRes, servicesRes] = await Promise.all([
          api.get("/api/users/available-users"),
          api.get("/api/services")
        ]);
        setAvailableUsers(usersRes.data);
        setAvailableServices(servicesRes.data);
      } catch (err) {
        console.error("Erro ao carregar dados", err);
      }
    };
    fetchData();
  }, []);

  const handleCheckboxChange = (serviceId: number) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId) return alert("Selecione um usuário!");

    setLoading(true);
    try {
      await api.post("/api/barbers", {
        userId: Number(selectedUserId),
        serviceIds: selectedServices
      });
      alert("Perfil profissional criado com sucesso!");

      setSelectedUserId("");
      setSelectedServices([]);
    } catch (err: any) {
      alert("Erro ao salvar: " + err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cyber-card">
      <h2 className="cyber-title">CONFIGURAR BARBEIRO</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="cyber-label">SELECIONE O PROFISSIONAL:</label>
          <select
            className="cyber-input"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            required
          >
            <option value="">-- Clique para selecionar --</option>
            {availableUsers.map((user: any) => (
              <option key={user.id} value={user.id}>
                {user.nome} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="cyber-label">SERVIÇOS DISPONÍVEIS:</label>
          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
            {availableServices.map((service: any) => (
              <label key={service.id} className="cyber-checkbox-container" style={{ cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service.id)}
                  onChange={() => handleCheckboxChange(service.id)}
                />
                <span style={{ marginLeft: '8px' }}>{service.nome}</span>
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="cyber-button" disabled={loading} style={{ marginTop: '20px' }}>
          {loading ? "SALVANDO..." : "VINCULAR BARBEIRO"}
        </button>
      </form>
    </div>
  );
}