import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import api from "../api/axios"

export default function CreateBooking() {
  const [searchParams] = useSearchParams()
  const mechanicId = searchParams.get("mechanicId")

  const [date, setDate] = useState("")
  const [slots, setSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (date) fetchSlots()
  }, [date])

  const fetchSlots = async () => {
    try {
      setLoading(true)

      const res = await api.get(
        `/bookings/available-slots?mechanicId=${mechanicId}&date=${date}`
      )

      setSlots(res.data.availableSlots)
    } catch (err) {
      console.log(err.response?.data || err.message)
      alert("Failed to load slots")
    } finally {
      setLoading(false)
    }
  }

  const createBooking = async () => {
    try {
      await api.post("/bookings", {
        mechanicId,
        date,
        timeSlot: selectedSlot
      })

      alert("Booking successful!")
      navigate("/mechanics")
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
      {loading && <p>Loading available slots...</p>}

      {/* TIME SLOTS */}
      <div style={styles.slotGrid}>
        {slots.map((slot) => (
          <button
            key={slot}
            onClick={() => setSelectedSlot(slot)}
            style={{
              ...styles.slot,
              background: selectedSlot === slot ? "#007bff" : "#eee",
              color: selectedSlot === slot ? "#fff" : "#000"
            }}
          >
            {slot}
          </button>
        ))}
      </div>

      {/* BOOK BUTTON */}
      <button
        onClick={createBooking}
        disabled={!selectedSlot || !date}
        style={styles.button}
      >
        Confirm Booking
      </button>
    </div>
  )
}

const styles = {
  container: {
    padding: 30
  },
  input: {
    padding: 10,
    marginBottom: 20
  },
  slotGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 10,
    marginBottom: 20
  },
  slot: {
    padding: 10,
    border: "none",
    cursor: "pointer",
    borderRadius: 6
  },
  button: {
    padding: 12,
    width: "100%",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  }
}