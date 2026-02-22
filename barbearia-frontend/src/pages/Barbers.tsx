import { useEffect, useState } from "react";
import { api } from "../api/api";

type Barber = {
  id: number;
  name: string;
};

function Barbers() {
  const [barbers, setBarbers] = useState<Barber[]>([]);

  useEffect(() => {
    api.get("/api/barbers")
      .then(res => setBarbers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Barbeiros</h1>

      <ul>
        {barbers.map(b => (
          <li key={b.id}>{b.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Barbers;