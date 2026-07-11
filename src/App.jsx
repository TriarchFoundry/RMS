<<<<<<< HEAD
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}
=======
import { useState } from "react";

import {
  NAV_ITEMS,
  COLORS,
  MOCK_PROPERTIES,
  CHART_DATA,
  COMPLAINTS,
  TENANTS,
  NOTIFICATIONS
} from "./data/mockData";

import Badge from "./components/Badge";
import StatCard from "./components/StatCard";
import MiniBarChart from "./components/MiniBarChart";


function App() {
  const [role, setRole] = useState("tenant");

  return (
    <div>
      <h1>RentEase Dashboard</h1>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setRole("tenant")}>Tenant</button>
        <button onClick={() => setRole("landlord")}>Landlord</button>
        <button onClick={() => setRole("admin")}>Admin</button>
      </div>

      <h3>Current Role: {role}</h3>

      <div style={{ display: "flex", gap: 10 }}>
        <Badge color="green">Active</Badge>
        <Badge color="blue">Verified</Badge>
        <Badge color="yellow">Pending</Badge>
      </div>
    </div>
  );
}

export default App;
>>>>>>> 95bbaa0ca1e47e774003cfdd4fa45c2fbb58cf95
