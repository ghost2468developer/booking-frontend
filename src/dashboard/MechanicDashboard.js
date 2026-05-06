import { useEffect, useState } from "react"
import api from "../api/axios"

export default function MechanicDashboard() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/mechanic")
      setBookings(res.data)
    } catch (err) {
      console.log(err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }

  const completeBooking = async (id) => {
    try {
      await api.patch(`/bookings/${id}/complete`)
      fetchBookings()
    } catch (err) {
      alert("Failed to complete booking")
    }
  }

  const cancelBooking = async (id) => {
    try {
      await api.patch(`/bookings/${id}/cancel`)
      fetchBookings()
    } catch (err) {
      alert("Failed to cancel booking")
    }
  }

  if (loading) return <p style={{ padding: 20 }}>Loading jobs...</p>

  return (
    <div style={styles.container}>
      <h2>Mechanic Dashboard</h2>

      {bookings.length === 0 && (
        <p>No assigned jobs yet.</p>
      )}

      <div style={styles.grid}>
        {bookings.map((b) => (
          <div key={b.id} style={styles.card}>
            <h3>{b.user?.name}</h3>
            <p>{b.user?.email}</p>

            <p>📅 {new Date(b.date).toDateString()}</p>
            <p>🕒 {b.timeSlot}</p>

            <p>
              Status: <b>{b.status || "ACTIVE"}</b>
            </p>

            <div style={styles.actions}>
              {b.status !== "COMPLETED" && (
                <button
                  onClick={() => completeBooking(b.id)}
                  style={styles.completeBtn}
                >
                  Mark Completed
                </button>
              )}

              {b.status !== "CANCELLED" && (
                <button
                  onClick={() => cancelBooking(b.id)}
                  style={styles.cancelBtn}
                >
                  Cancel
                </button>
              )}
            </div>
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
    gap: 20,
    marginTop: 20
  },
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
  },
  actions: {
    display: "flex",
    gap: 10,
    marginTop: 10
  },
  completeBtn: {
    flex: 1,
    padding: 8,
    background: "green",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer"
  },
  cancelBtn: {
    flex: 1,
    padding: 8,
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer"
  }
}