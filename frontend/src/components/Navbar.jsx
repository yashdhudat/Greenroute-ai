import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{
      background: "#101820FF",
      color: "#FEE715FF",
      padding: "1rem 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ margin: 0, fontWeight: 600, fontSize: "1.4rem" }}>
        <span role="img" aria-label="leaf">🌿</span> GreenRoute <span style={{ color: "#fff" }}>AI</span>
      </h2>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <NavLink to="/" label="🏠 Home" />
        <NavLink to="/delivery" label="📦 Delivery" />
        <NavLink to="/eco-match" label="🌱 Eco Match" />
        <NavLink to="/dashboard" label="📊 Dashboard" />
        <NavLink to="/history" label="📜 History" />
        <NavLink to="/map" label="🗺️ Map" /> {/* ✅ Final working version */}
      </div>
    </nav>
  );
}

function NavLink({ to, label }) {
  return (
    <Link
      to={to}
      style={{
        color: "white",
        textDecoration: "none",
        fontWeight: 500,
        transition: "color 0.3s"
      }}
      onMouseEnter={(e) => (e.target.style.color = "#FEE715FF")}
      onMouseLeave={(e) => (e.target.style.color = "white")}
    >
      {label}
    </Link>
  );
}
