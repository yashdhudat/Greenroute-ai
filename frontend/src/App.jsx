import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DeliveryForm from "./pages/DeliveryForm";
import EcoMatch from "./pages/EcoMatch";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import MapView from "./pages/MapView";

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Use your custom Navbar here */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/delivery" element={<DeliveryForm />} />
        <Route path="/eco-match" element={<EcoMatch />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/map" element={<MapView />} /> {/* ✅ Map Route */}
      </Routes>
    </Router>
  );
}

export default App;
