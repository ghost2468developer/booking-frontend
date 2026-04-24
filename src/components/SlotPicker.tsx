"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"

type Props = {
  mechanicId: string
}

export default function SlotPicker({ mechanicId }: Props) {
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const fetchSlots = async (selectedDate: string) => {
    if (!selectedDate) return;

    setLoading(true)

    try {
      const res = await api.get("/bookings/available-slots", {
        params: {
          mechanicId,
          date: selectedDate
        }
      })

      setSlots(res.data.availableSlots)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (date) fetchSlots(date)
  }, [date])

  const bookSlot = async (timeSlot: string) => {
    try {
      await api.post("/bookings", {
        mechanicId,
        date,
        timeSlot
      })

      alert("Booking successful 🚗🔧")

      // refresh slots after booking
      fetchSlots(date)
    } catch (err: any) {
      alert(err.response?.data?.message || "Booking failed")
    }
  }

  return (
    <div className="mt-4 border p-4 rounded bg-white">
      <h3 className="font-bold mb-2">Pick Date & Time</h3>

      {/* DATE PICKER */}
      <input
        type="date"
        className="border p-2 w-full mb-4"
        onChange={(e) => setDate(e.target.value)}
      />

      {/* LOADING */}
      {loading && <p>Loading available slots...</p>}

      {/* SLOTS */}
      <div className="grid grid-cols-4 gap-2">
        {slots.map((slot) => (
          <button
            key={slot}
            onClick={() => bookSlot(slot)}
            className="bg-black text-white p-2 rounded hover:bg-gray-800"
          >
            {slot}
          </button>
        ))}
      </div>

      {date && slots.length === 0 && !loading && (
        <p className="text-gray-500 mt-2">
          No available slots for this day
        </p>
      )}
    </div>
  )
}