import { useState } from "react";
import axios from "axios";

export default function DeliveryForm() {
  const [formData, setFormData] = useState({
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    packageType: "medium",
    ecoFriendly: true,
  });

  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/submit-delivery", formData);
      console.log("✅ Server Response:", res.data);
      setResponse(res.data);
    } catch (err) {
      console.error("❌ Error submitting:", err);
      alert("Failed to submit. Is the backend running?");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📦 Enter Delivery Route Information</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <label>
          Pickup Location:
          <input type="text" name="pickup" value={formData.pickup} onChange={handleChange} required />
        </label>
        <br /><br />

        <label>
          Drop-off Location:
          <input type="text" name="dropoff" value={formData.dropoff} onChange={handleChange} required />
        </label>
        <br /><br />

        <label>
          Date:
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </label>
        <br /><br />

        <label>
          Time:
          <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        </label>
        <br /><br />

        <label>
          Package Type:
          <select name="packageType" value={formData.packageType} onChange={handleChange}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
        <br /><br />

        <label>
          Eco-Delivery:
          <input type="checkbox" name="ecoFriendly" checked={formData.ecoFriendly} onChange={handleChange} />
        </label>
        <br /><br />

        <button type="submit">Submit Delivery</button>
      </form>

      {response && (
        <div style={{ marginTop: "2rem", background: "#e6f5e6", padding: "1rem", borderRadius: "10px" }}>
          <h3>✅ Delivery Submitted!</h3>
          <p><strong>Status:</strong> {response.status}</p>
          <p><strong>Message:</strong> {response.message}</p>
          {response.ecoMatch && (
            <>
              <p>🌍 <strong>CO₂ Saved:</strong> {response.estimated_co2_saved} kg</p>
              <p>🧠 <strong>Grouped With:</strong> {response.delivery_group}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
