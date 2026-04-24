"use client"

import { useEffect, useState } from "react"
import api from "../../lib/api"
import SlotPicker from "../../components/SlotPicker"

type Mechanic = {
  id: string
  name: string
  email: string
  workingDays?: string
  startHour?: string
  endHour?: string
}

export default function MechanicsPage() {
  const [mechanics, setMechanics] = useState<Mechanic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const res = await api.get("/auth/mechanics")
        setMechanics(res.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMechanics()
  }, [])

  if (loading) {
    return <p>Loading mechanics...</p>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Available Mechanics 🔧</h1>

      <div className="grid grid-cols-3 gap-4">
        {mechanics.map((m) => (
          <div key={m.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">{m.name}</h2>
            <p className="text-sm text-gray-500">{m.email}</p>

            <div className="mt-3 text-sm">
              <p>
                <strong>Working Days:</strong> {m.workingDays || "Not set"}
              </p>
              <p>
                <strong>Hours:</strong>{" "}
                {m.startHour && m.endHour
                  ? `${m.startHour} - ${m.endHour}`
                  : "Not set"}
              </p>
            </div>

            <SlotPicker mechanicId={m.id} />
          </div>
        ))}
      </div>
    </div>
  )
}