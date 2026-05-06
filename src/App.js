import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./auth/Login"
import Register from "./auth/Register"
import MechanicsList from "./mechanics/MechanicsList"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mechanics" element={<MechanicsList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App