import { useEffect, useState } from "react";
import { api } from "../api/api";
import "../styles/dashboard.css"
import { useNavigate, Link} from "react-router-dom"

interface Barber {
  id: number
  userId: number
  active: boolean
}

interface User {
  id: number
  name: string
}

interface Service {
  id: number
  name: string
}

export default function DashboardAdmin() {
  const [barbers, setBarbers] = useState<Barber[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [selectedUser, setSelectedUser] = useState("")
  const [selectedServices, setSelectedServices] = useState<number[]>([])
  const [loading, setLoading] = useState(false)

  const fetchAll = async () => {
    try {
      const [barbersRes, usersRes, servicesRes] = await Promise.all([
        api.get("/barbers"),
        api.get("/users"),
        api.get("/services")
      ])

      setBarbers(barbersRes.data)
      setUsers(usersRes.data)
      setServices(servicesRes.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser) return alert("Selecione um usuário")

    setLoading(true)

    try {
      await api.post("/barbers", {
        userId: Number(selectedUser),
        serviceIds: selectedServices
      })

      setSelectedUser("")
      setSelectedServices([])
      fetchAll()
    } catch (err: any) {
      console.error(err.response?.data)
      alert("Erro ao criar barbeiro")
    } finally {
      setLoading(false)
    }
  }

  const toggleService = (id: number) => {
    setSelectedServices((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    )
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Desativar barbeiro?")) return

    await api.delete(`/barbers/${id}`)
    fetchAll()
  }

  const activeCount = barbers.filter((b) => b.active).length

  return (
    <div className="admin-container">
      <h1 className="admin-title">PAINEL DE CONTROLE</h1>


      <div className="metrics">
        <div className="metric-card">
          <span>Barbeiros = </span>
          <strong>{barbers.length}</strong>
        </div>
        <div className="metric-card">
          <span>Ativos = </span>
          <strong>{activeCount}</strong>
        </div>
        <div className="metric-card">
          <span>Usuários = </span>
          <strong>{users.length}</strong>
        </div>
      </div>


      <form onSubmit={handleCreate} className="admin-form">
        <h2>Criar Barbeiro</h2>

        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Selecione um usuário</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name} (ID {u.id})
            </option>
          ))}
        </select>

        <div className="services-grid">
          {services.map((s) => (
            <label key={s.id} className="service-chip">
              <input
                type="checkbox"
                checked={selectedServices.includes(s.id)}
                onChange={() => toggleService(s.id)}
              />
              {s.name}
            </label>
          ))}
        </div>

        <button disabled={loading}>
          {loading ? "Criando..." : "Criar Barbeiro"}
        </button>
      </form>


      <div className="barber-grid">
        {barbers.map((b) => (
          <div
            key={b.id}
            className={`barber-card ${b.active ? "active" : "inactive"}`}
          >
            <p>ID: {b.id}</p>
            <p>User ID: {b.userId}</p>

            <span className="status">
              {b.active ? "ATIVO" : "INATIVO"}
            </span>

            <button onClick={() => handleDelete(b.id)}>
              Desativar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}