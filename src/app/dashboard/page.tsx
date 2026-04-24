// "use client"

// import { useEffect } from "react"
// import { useRouter } from "next/navigation"

// export default function Dashboard() {
//   const router = useRouter()

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       router.push("/login")
//     }
//   }, [])

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Dashboard</h1>
//       <p>Welcome to Mechanic Booking System 🚗🔧</p>
//     </div>
//   )
// }

"use client"

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg font-bold">Total Bookings</h3>
        <p className="text-2xl">12</p>
      </div>

      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg font-bold">Pending</h3>
        <p className="text-2xl">4</p>
      </div>

      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg font-bold">Completed</h3>
        <p className="text-2xl">8</p>
      </div>
    </div>
  )
}