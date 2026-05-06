const { login } = useContext(AuthContext)

const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const res = await api.post("/auth/login", {
      email,
      password
    })

    login(res.data)

    // 👇 role-based redirect (important)
    const role = res.data.user.role

    if (role === "MECHANIC") {
      navigate("/mechanic-dashboard")
    } else {
      navigate("/dashboard")
    }

  } catch (err) {
    alert(err.response?.data?.message || "Login failed")
  }
}