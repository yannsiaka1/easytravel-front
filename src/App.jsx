import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./pages/Apropos";
import AgentDashboard from "./pages/AgentDashboard";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ListeVoyages from "./pages/ListeVoyages";
import ListeVoyagesDashboard from "./pages/ListeVoyagesDashboard";
import LoginPage from "./pages/Login";
import MesReservations from "./pages/MesReservations";
import Paiement from "./pages/paiement";
import RechercheDashboard from "./pages/RechercheDashboard";
import RegisterPage from "./pages/Register";
import Services from "./pages/Services";
import TicketDetails from "./pages/TicketVerification";
import Utilisateurs from "./pages/Utilisateurs";
import Voyages from "./pages/Voyages";

const client = (element) => <ProtectedRoute role="client">{element}</ProtectedRoute>;
const agent = (element) => <ProtectedRoute role="agent">{element}</ProtectedRoute>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/dashboard" element={client(<Dashboard />)} />
        <Route path="/reservation" element={client(<Navigate to="/recherche" replace />)} />
        <Route path="/recherche" element={client(<RechercheDashboard />)} />
        <Route path="/voyages" element={client(<ListeVoyagesDashboard />)} />
        <Route path="/liste-voyages" element={client(<ListeVoyages />)} />
        <Route path="/ticket-details" element={client(<TicketDetails />)} />
        <Route path="/paiement" element={client(<Paiement />)} />
        <Route path="/mes-reservations" element={client(<MesReservations />)} />

        <Route path="/agent/dashboard" element={agent(<AgentDashboard />)} />
        <Route path="/agent/voyages" element={agent(<Voyages />)} />
        <Route path="/agent/utilisateurs" element={agent(<Utilisateurs />)} />
        <Route path="/ajouter-voyage" element={<Navigate to="/agent/voyages" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
