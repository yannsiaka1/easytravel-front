import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import VoyageCards from "../components/VoyageCards";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function ListeVoyagesDashboard() {
  const navigate = useNavigate();
  const [voyages, setVoyages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/voyages")
      .then(({ data }) => setVoyages(data.voyages || []))
      .catch((requestError) => {
        setError(requestError.response?.data?.message || "Impossible de charger les voyages.");
      })
      .finally(() => setLoading(false));
  }, []);

  const selectVoyage = (voyage) => {
    localStorage.setItem("nombreTickets", "1");
    navigate("/ticket-details", { state: { voyage, tickets: 1 } });
  };

  return (
    <div className="min-h-screen bg-[#0A1B29] pt-16 text-white lg:pl-64">
      <Sidebar />
      <Navbar />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mb-7">
          <p className="text-sm font-semibold uppercase tracking-[.2em] text-[#D4AF37]">Catalogue</p>
          <h1 className="mt-1 text-3xl font-black">Voyages à venir</h1>
          <p className="mt-2 text-slate-400">Consultez les départs disponibles et sélectionnez votre trajet.</p>
        </div>
        <VoyageCards voyages={voyages} loading={loading} error={error} onSelect={selectVoyage} />
      </main>
    </div>
  );
}
