import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import api from "../api/axios"

export default function CreateBooking() {
  const [searchParams] = useSearchParams()
  const mechanicId = searchParams.get("mechanicId")

  const [date, setDate] = useState("")
  const [available, setAvailable] = useState(null)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (date) checkAvailability()
  }, [date])

  const checkAvailability = async () => {
    try {
      setLoading(true)

      const res = await api.get(
        `/bookings/available-slots?mechanicId=${mechanicId}&date=${date}`
      )

      setAvailable(res.data.available)
      setMessage(res.data.message || "")
    } catch (err) {
      console.log(err.response?.data || err.message)
      alert("Failed to check availability")
    } finally {
      setLoading(false)
    }
  }

  const createBooking = async () => {
    try {
      await api.post("/bookings", {
        mechanicId,
        date
      })

      alert("Booking successful!")
      navigate("/bookings")
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed")
    }
  }

  return (
    <div style={styles.container}>
      <h2>Book Mechanic</h2>

      {/* DATE PICKER */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={styles.input}
      />

      {/* LOADING */}
      {loading && <p>Checking availability...</p>}

      {/* STATUS */}
      {date && !loading && (
        <div style={styles.statusBox}>
          {available === true && (
            <p style={{ color: "green" }}>
              ✅ Mechanic is available on this day
            </p>
          )}

          {available === false && (
            <p style={{ color: "red" }}>
              ❌ {message || "Mechanic is not available"}
            </p>
          )}
        </div>
      )}

      {/* BOOK BUTTON */}
      <button
        onClick={createBooking}
        disabled={!date || available !== true}
        style={{
          ...styles.button,
          background:
            !date || available !== true ? "#ccc" : "#28a745",
          cursor:
            !date || available !== true ? "not-allowed" : "pointer"
        }}
      >
        Confirm Booking
      </button>
    </div>
  )
}

const styles = {
  container: {
    padding: 30,
    background: "#f5f6f8",
    minHeight: "100vh"
  },
  input: {
    padding: 10,
    marginBottom: 20,
    borderRadius: 6,
    border: "1px solid #ccc"
  },
  statusBox: {
    marginBottom: 20,
    padding: 10,
    background: "#fff",
    borderRadius: 6,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },
  button: {
    padding: 12,
    width: "100%",
    border: "none",
    borderRadius: 6,
    color: "#fff"
  }
}