"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
import { AuthResponse } from "@/types"

export default function LoginPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const res = await api.post<AuthResponse>("/auth/login", form)

      // save token
      localStorage.setItem("token", res.data.token)

      router.push("/dashboard")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-6 border rounded w-96 space-y-3">
        <h1 className="text-xl font-bold">Login</h1>

        <input name="email" placeholder="Email" onChange={handleChange} className="w-full border p-2" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full border p-2" />

        <button className="bg-black text-white w-full p-2">
          Login
        </button>
      </form>
    </div>
  )
}