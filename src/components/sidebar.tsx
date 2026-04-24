"use client"

import Link from "next/link"

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black text-white p-5 flex flex-col gap-4">
      <h1 className="text-xl font-bold">Mechanic App</h1>

      <nav className="flex flex-col gap-3 mt-5">
        <Link href="/dashboard">🏠 Dashboard</Link>
        <Link href="/bookings">📅 My Bookings</Link>
        <Link href="/mechanics">🔧 Mechanics</Link>
      </nav>
    </aside>
  )
}