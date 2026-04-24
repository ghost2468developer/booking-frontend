"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"

type Booking = {
  id: string
  date: string
  timeSlot: string
  status: string
  user: {
    name: string
    email: string
  }
}

export default function MechanicDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/mechanic")
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
    }, 5000)

    return () => clearInterval(interval);
  }, [])

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/bookings/${id}/status`, {
        status
      })

      fetchBookings()
    } catch (err: any) {
      alert(err.response?.data?.message || "Update failed")
    }
  }

  if (loading) {
    return <p>Loading mechanic dashboard...</p>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Mechanic Dashboard 🔧
      </h1>

      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            {/* LEFT */}
            <div>
              <h2 className="font-bold">{b.user.name}</h2>
              <p className="text-sm text-gray-500">{b.user.email}</p>

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

            {/* RIGHT ACTIONS */}
            <div className="flex flex-col gap-2">
              {b.status === "PENDING" && (
                <button
                  onClick={() => updateStatus(b.id, "CONFIRMED")}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Confirm
                </button>
              )}

              {b.status === "CONFIRMED" && (
                <button
                  onClick={() => updateStatus(b.id, "COMPLETED")}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Complete
                </button>
              )}

              {b.status !== "COMPLETED" && b.status !== "CANCELLED" && (
                <button
                  onClick={() => updateStatus(b.id, "CANCELLED")}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {bookings.length === 0 && (
        <p className="text-gray-500">No bookings assigned</p>
      )}
    </div>
  )
}