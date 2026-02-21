import { useEffect, useState } from "react";
import { api } from "./api/api";

type Barber = {
  id: number;
  name: string;
};

function App() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/barbers")
      .then(response => {
        setBarbers(response.data);
      })
      .catch(err => {
        console.error(err);
        setError("Erro ao buscar barbeiros");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Barbeiros</h1>

      {barbers.length === 0 ? (
        <p>Nenhum barbeiro encontrado</p>
      ) : (
        <ul>
          {barbers.map(barber => (
            <li key={barber.id}>{barber.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;