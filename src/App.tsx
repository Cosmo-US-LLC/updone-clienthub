import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import DashboardLayout from "./components/layout/DashboardLayout";
import Payment from "./pages/Payment";
import Settlement from "./pages/Settlement";
import Reviews from "./pages/Reviews";
import Settings from "./pages/Settings";
import EventDetails from "./pages/Event/Event";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/payments" element={<Payment />} />
        <Route path="/settlements" element={<Settlement />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/settings" element={<Settings />} />
        {/* <Route path="project/:id" element={<Project />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
