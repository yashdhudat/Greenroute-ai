import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ color: "#1e1e2f" }}>
        <span role="img" aria-label="seedling">🌱</span> Welcome to GreenRoute AI
      </h1>
      <p style={{ fontSize: "1.1rem", color: "#333" }}>
        We optimize your delivery routes for a greener tomorrow.
      </p>
    </div>
  );
}

