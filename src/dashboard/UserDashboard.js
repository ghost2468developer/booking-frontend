import { useEffect, useState } from "react"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"

export default function UserDashboard() {
  const [bookings, setBookings] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/mine")
      setBookings(res.data)
    } catch (err) {
      console.log(err.response?.data || err.message)
    }
  }

  const total = bookings.length
  const cancelled = bookings.filter(b => b.status === "CANCELLED").length
  const active = bookings.filter(b => b.status !== "CANCELLED").length

  const recent = bookings.slice(0, 4)

  return (
    <div style={styles.container}>
      <h2>Dashboard</h2>

      {/* STATS */}
      <div style={styles.stats}>
        <div style={styles.card}>
          <h3>{total}</h3>
          <p>Total Bookings</p>
        </div>

        <div style={styles.card}>
          <h3>{active}</h3>
          <p>Active</p>
        </div>

        <div style={styles.card}>
          <h3>{cancelled}</h3>
          <p>Cancelled</p>
        </div>
      </div>

      {/* ACTIONS */}
      <div style={styles.actions}>
        <button
          style={styles.primaryBtn}
          onClick={() => navigate("/mechanics")}
        >
          Book Mechanic
        </button>

        <button
          style={styles.secondaryBtn}
          onClick={() => navigate("/bookings")}
        >
          View All Bookings
        </button>
      </div>

      {/* RECENT BOOKINGS */}
      <h3 style={{ marginTop: 30 }}>Recent Bookings</h3>

      <div style={styles.grid}>
        {recent.map((b) => (
          <div key={b.id} style={styles.bookingCard}>
            <h4>{b.mechanic?.name}</h4>
            <p>📅 {new Date(b.date).toDateString()}</p>
            <p>🕒 {b.timeSlot}</p>
            <p>Status: {b.status || "ACTIVE"}</p>
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

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 15,
    marginTop: 20
  },

  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
  },

  actions: {
    marginTop: 25,
    display: "flex",
    gap: 10
  },

  primaryBtn: {
    padding: 12,
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  },

  secondaryBtn: {
    padding: 12,
    background: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 15,
    marginTop: 15
  },

  bookingCard: {
    background: "#fff",
    padding: 15,
    borderRadius: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  }
}