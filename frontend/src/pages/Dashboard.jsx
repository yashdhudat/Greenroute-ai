import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/dashboard-summary")
      .then(res => setSummary(res.data))
      .catch(err => console.error("Dashboard fetch error", err));
  }, []);

  if (!summary) return <p style={{ padding: "2rem" }}>Loading dashboard...</p>;

  return (
    <div style={{ padding: "2rem 4rem" }}>
      <h2>📊 Dashboard Summary</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", marginTop: "2rem" }}>
        <Card label="Total Deliveries" value={summary.total_deliveries} />
        <Card label="Eco Deliveries" value={summary.eco_deliveries} />
        <Card label="Fuel Saved (L)" value={summary.fuel_saved_liters.toFixed(1)} />
        <Card label="CO₂ Reduced (kg)" value={summary.co2_reduced_kg.toFixed(1)} />
        <Card label="Eco Points 🌿" value={summary.eco_points} />
      </div>
    </div>
  );
}

function Card({ label, value }) {
  return (
    <div style={{
      background: "#fff",
      padding: "1.5rem 2rem",
      borderRadius: "12px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      flex: "1 1 200px"
    }}>
      <h3 style={{ margin: 0, fontSize: "1.2rem", color: "#1e1e2f" }}>{label}</h3>
      <p style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#16a34a" }}>{value}</p>
    </div>
  );
}
