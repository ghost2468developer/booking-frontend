import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"

import Login from "./auth/Login"
import Register from "./auth/Register"

import UserDashboard from "./dashboard/UserDashboard"
import MechanicsList from "./mechanics/MechanicsList"
import MechanicDashboard from "./dashboard/MechanicDashboard"
import CreateBooking from "./bookings/CreateBooking"
import Bookings from "./bookings/Bookings"

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/mechanic-dashboard" element={<MechanicDashboard />} />
        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER FLOW (PROTECTED) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mechanics"
          element={
            <ProtectedRoute>
              <MechanicsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/book"
          element={
            <ProtectedRoute>
              <CreateBooking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App