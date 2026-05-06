import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./auth/Login"
import Register from "./auth/Register"
import MechanicsList from "./mechanics/MechanicsList"
import MyBookings from "./bookings/MyBookings"
import CreateBooking from "./bookings/CreateBooking"
import Bookings from "./bookings/Bookings"
import Navbar from "./components/Navbar"
import UserDashboard from "./dashboard/UserDashboard"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mechanics" element={<MechanicsList />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/book" element={<CreateBooking />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App