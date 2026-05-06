import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../api/axios"

export default function BookingPage() {
  const { mechanicId } = useParams()
  const navigate = useNavigate()

  const [date, setDate] = useState("")
  const [slots, setSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState("")
  const [loading, setLoading] = useState(false)

  // 1. Fetch available slots whenever date changes
  const fetchSlots = async (selectedDate) => {
    if (!selectedDate) return

    try {
      setLoading(true)

      const res = await api.get(
        `/bookings/available-slots?mechanicId=${mechanicId}&date=${selectedDate}`
      )

      setSlots(res.data.availableSlots)
    } catch (err) {
      console.log(err)
      alert("Failed to load slots")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSlots(date)
  }, [date])

  // 2. Create booking
  const createBooking = async () => {
    if (!date || !selectedSlot) {
      alert("Select date and time")
      return
    }

    try {
      await api.post("/bookings", {
        mechanicId,
        date,
        timeSlot: selectedSlot
      })

      alert("Booking successful 🎉")
      navigate("/mechanics")
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed")
    }
  }

  return (
    <div style={styles.container}>
      <h2>Book Appointment</h2>

      {/* DATE PICKER */}
      <div style={styles.section}>
        <label>Select Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* LOADING */}
      {loading && <p>Loading available slots...</p>}

      {/* SLOTS */}
      {date && (
        <div style={styles.section}>
          <h4>Available Time Slots</h4>

          <div style={styles.grid}>
            {slots.length === 0 && !loading && (
              <p>No slots available</p>
            )}

            {slots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                style={{
                  ...styles.slot,
                  background:
                    selectedSlot === slot ? "#007bff" : "#eee",
                  color: selectedSlot === slot ? "#fff" : "#000"
                }}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CONFIRM BUTTON */}
      {selectedSlot && (
        <button style={styles.bookBtn} onClick={createBooking}>
          Confirm Booking ({selectedSlot})
        </button>
      )}
    </div>
  )
}

const styles = {
  container: {
    padding: 30,
    background: "#f4f6f8",
    minHeight: "100vh"
  },
  section: {
    marginTop: 20
  },
  input: {
    padding: 10,
    width: "100%",
    marginTop: 5
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10
  },
  slot: {
    padding: "10px 15px",
    border: "none",
    borderRadius: 5,
    cursor: "pointer"
  },
  bookBtn: {
    marginTop: 30,
    padding: 15,
    width: "100%",
    background: "green",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer"
  }
}