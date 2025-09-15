import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

export default function MapView() {
  const [deliveries, setDeliveries] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/deliveries")
      .then(res => {
        setDeliveries(res.data);
        fetchCoordinates(res.data);
      });
  }, []);

  const fetchCoordinates = async (data) => {
    const coords = await Promise.all(data.map(async (d) => {
      return {
        id: d.id,
        pickup: d.pickup,
        dropoff: d.dropoff,
        pickupPos: [28.61 + Math.random(), 77.21 + Math.random()],
        dropoffPos: [28.61 + Math.random(), 77.21 + Math.random()]
      };
    }));
    setPositions(coords);
  };

  return (
    <div style={{ height: "90vh", padding: "1rem" }}>
      <h2>🗺️ Delivery Route Map</h2>
      <MapContainer center={[28.61, 77.21]} zoom={5} style={{ height: "80vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {positions.map((d, i) => (
          <div key={d.id}>
            <Marker position={d.pickupPos}>
              <Popup>📦 Pickup: {d.pickup}</Popup>
            </Marker>
            <Marker position={d.dropoffPos}>
              <Popup>📍 Dropoff: {d.dropoff}</Popup>
            </Marker>
            <Polyline positions={[d.pickupPos, d.dropoffPos]} color={i % 2 === 0 ? "green" : "blue"} />
          </div>
        ))}
      </MapContainer>
    </div>
  );
}
