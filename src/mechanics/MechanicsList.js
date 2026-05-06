import { useEffect, useState } from "react"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"

export default function MechanicsList() {
  const [mechanics, setMechanics] = useState([])
  const navigate = useNavigate()

  const fetchMechanics = async () => {
    try {
      const res = await api.get("/auth/mechanics")
      setMechanics(res.data)
    } catch (err) {
      console.log(err)
      alert("Failed to load mechanics")
    }
  }

  useEffect(() => {
    fetchMechanics()
  }, [])

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Choose a Mechanic</h2>

      <div style={styles.grid}>
        {mechanics.map((m) => (
          <div key={m.id} style={styles.card}>
            <h3>{m.name}</h3>
            <p>{m.email}</p>

            <p style={styles.badge}>
              {m.workingDays || "No schedule set"}
            </p>

            <p>
              🕒 {m.startHour || "--"} - {m.endHour || "--"}
            </p>

            <button
              style={styles.button}
              onClick={() =>
                navigate(`/book/${m.id}`)
              }
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: 30,
    background: "#f4f6f8",
    minHeight: "100vh"
  },
  title: {
    marginBottom: 20
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 20
  },
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  badge: {
    display: "inline-block",
    background: "#eee",
    padding: "5px 10px",
    borderRadius: 5,
    margin: "10px 0"
  },
  button: {
    marginTop: 10,
    width: "100%",
    padding: 10,
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer"
  }
}