import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <div style={styles.nav}>
      <Link to="/mechanics">Mechanics</Link>
      <Link to="/bookings">My Bookings</Link>
    </div>
  )
}

const styles = {
  nav: {
    display: "flex",
    gap: 20,
    padding: 15,
    background: "#222",
    color: "#fff"
  }
}