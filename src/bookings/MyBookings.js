import { useEffect, useState } from "react"
import api from "../api/axios"

export default function MyBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchBookings = async () => {
    try {
      setLoading(true)

      const res = await api.get("/bookings/mine")
      setBookings(res.data)
    } catch (err) {
      console.log(err)
      alert("Failed to load bookings")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  // Cancel booking
  const cancelBooking = async (id) => {
    try {
      await api.patch(`/bookings/${id}/cancel`)

      // refresh list
      setBookings((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, status: "CANCELLED" } : b
        )
      )
    } catch (err) {
      alert(err.response?.data?.message || "Cancel failed")
    }
  }

  return (
    <div style={styles.container}>
      <h2>My Bookings</h2>

      {loading && <p>Loading...</p>}

      {!loading && bookings.length === 0 && (
        <p>No bookings yet</p>
      )}

      <div style={styles.grid}>
        {bookings.map((b) => (
          <div key={b.id} style={styles.card}>
            <h3>{b.mechanic?.name}</h3>

            <p>📅 {new Date(b.date).toDateString()}</p>
            <p>🕒 {b.timeSlot}</p>

            <p>
              Status:{" "}
              <b
                style={{
                  color:
                    b.status === "CANCELLED"
                      ? "red"
                      : "green"
                }}
              >
                {b.status || "BOOKED"}
              </b>
            </p>

            {b.status !== "CANCELLED" && (
              <button
                style={styles.cancelBtn}
                onClick={() => cancelBooking(b.id)}
              >
                Cancel Booking
              </button>
            )}
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 20,
    marginTop: 20
  },
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  cancelBtn: {
    marginTop: 10,
    width: "100%",
    padding: 10,
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer"
  }
}