"use client";

import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/api"

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER"
  })

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      await api.post("/auth/register", form)
      router.push("/login")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-6 border rounded w-96 space-y-3">
        <h1 className="text-xl font-bold">Register</h1>

        <input name="name" placeholder="Name" onChange={handleChange} className="w-full border p-2" />
        <input name="email" placeholder="Email" onChange={handleChange} className="w-full border p-2" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full border p-2" />

        <select name="role" onChange={handleChange} className="w-full border p-2">
          <option value="USER">User</option>
          <option value="MECHANIC">Mechanic</option>
        </select>

        <button className="bg-black text-white w-full p-2">
          Register
        </button>
      </form>
    </div>
  )
}