import { useEffect, useState } from "react"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"

export default function MechanicsList() {
  const [mechanics, setMechanics] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchMechanics()
  }, [])

  const fetchMechanics = async () => {
    try {
      const res = await api.get("/auth/mechanics")
      setMechanics(res.data)
    } catch (err) {
      console.log(err.response?.data || err.message)
      alert("Failed to load mechanics")
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p style={{ padding: 20 }}>Loading mechanics...</p>

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: 20 }}>Available Mechanics</h2>

      <div style={styles.grid}>
        {mechanics.map((m) => (
          <div key={m.id} style={styles.card}>
            <h3>{m.name}</h3>
            <p>{m.email}</p>

            <div style={styles.badge}>
              {m.role || "MECHANIC"}
            </div>

            <p style={{ marginTop: 10 }}>
              🕒 {m.startHour} - {m.endHour}
            </p>

            <p>
              📅 {m.workingDays}
            </p>

            <button
              style={styles.button}
              onClick={() => navigate(`/book?mechanicId=${m.id}`)}
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
    background: "#f5f6f8",
    minHeight: "100vh"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 20
  },
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
  },
  button: {
    marginTop: 15,
    width: "100%",
    padding: 10,
    border: "none",
    background: "#007bff",
    color: "#fff",
    borderRadius: 6,
    cursor: "pointer"
  },
  badge: {
    display: "inline-block",
    padding: "4px 8px",
    background: "#e0f0ff",
    borderRadius: 5,
    fontSize: 12,
    marginTop: 5
  }
}