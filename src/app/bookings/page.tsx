"use client"

import { useEffect, useState } from "react"
import api from "../../lib/api"

type Booking = {
  id: string
  date: string
  timeSlot: string
  status: string
  mechanic: {
    name: string
    email: string
  }
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/mine")
      setBookings(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()

    const interval = setInterval(() => {
      fetchBookings()
    }, 5000) // every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const cancelBooking = async (id: string) => {
    try {
      await api.patch(`/bookings/${id}/cancel`)

      alert("Booking cancelled")

      fetchBookings(); // refresh list
    } catch (err: any) {
      alert(err.response?.data?.message || "Cancel failed")
    }
  }

  if (loading) {
    return <p>Loading bookings...</p>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Bookings 📅</h1>

      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            {/* LEFT */}
            <div>
              <h2 className="font-bold">{b.mechanic.name}</h2>
              <p className="text-sm text-gray-500">{b.mechanic.email}</p>

              <p className="mt-2">
                {b.date.split("T")[0]} at {b.timeSlot}
              </p>

              <span
                className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                  b.status === "PENDING"
                    ? "bg-yellow-200"
                    : b.status === "CONFIRMED"
                    ? "bg-blue-200"
                    : b.status === "COMPLETED"
                    ? "bg-green-200"
                    : "bg-red-200"
                }`}
              >
                {b.status}
              </span>
            </div>

            {/* RIGHT */}
            <div>
              {b.status !== "COMPLETED" && b.status !== "CANCELLED" && (
                <button
                  onClick={() => cancelBooking(b.id)}
                  className="bg-red-500 text-white px-3 py-2 rounded"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {bookings.length === 0 && (
        <p className="text-gray-500">No bookings found</p>
      )}
    </div>
  )
}