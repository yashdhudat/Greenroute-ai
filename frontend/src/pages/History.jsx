import { useEffect, useState } from "react";
import axios from "axios";
import "./History.css"; // Optional styling


export default function History() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/deliveries")
      .then((res) => {
        setDeliveries(res.data);
      })
      .catch((err) => {
        console.error("Failed to load delivery history:", err);
      });
  }, []);

  return (
    <div className="history-container">
      <h2>📜 Delivery History</h2>
      {deliveries.length === 0 ? (
        <p>No deliveries yet.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Pickup</th>
              <th>Dropoff</th>
              <th>Date</th>
              <th>Time</th>
              <th>Package</th>
              <th>Eco?</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.pickup}</td>
                <td>{d.dropoff}</td>
                <td>{d.date}</td>
                <td>{d.time}</td>
                <td>{d.packageType}</td>
                <td>{d.ecoFriendly ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
