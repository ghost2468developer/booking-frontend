import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
  }

  return (
    <div style={styles.nav}>
      <div style={{ display: "flex", gap: 15 }}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/mechanics">Mechanics</Link>
        <Link to="/bookings">My Bookings</Link>
      </div>

      <button onClick={logout} style={styles.logout}>
        Logout
      </button>
    </div>
  )
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: 15,
    background: "#222",
    color: "#fff"
  },
  logout: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 5,
    cursor: "pointer"
  }
}