import { useState } from "react"
import api from "../api/axios"
import { useNavigate, Link } from "react-router-dom"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("USER")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role
      })

      alert("Account created")
      navigate("/")
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed")
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.input}
          >
            <option value="USER">User</option>
            <option value="MECHANIC">Mechanic</option>
          </select>

          <button style={styles.button}>Register</button>
        </form>

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8"
  },
  card: {
    padding: 30,
    width: 320,
    background: "#fff",
    borderRadius: 10,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },
  input: {
    width: "100%",
    padding: 10,
    margin: "10px 0",
    borderRadius: 5,
    border: "1px solid #ccc"
  },
  button: {
    width: "100%",
    padding: 10,
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer"
  }
}