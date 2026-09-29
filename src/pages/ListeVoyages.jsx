import { ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import logo from "../assets/easy_travel_logos.png";
import VoyageCards from "../components/VoyageCards";

export default function ListeVoyages() {
  const navigate = useNavigate();
  const location = useLocation();
  const voyagesFromState = useMemo(() => location.state?.voyages || [], [location.state]);
  const places = Number(location.state?.tickets || localStorage.getItem("nombreTickets") || 1);
  const [voyages, setVoyages] = useState(voyagesFromState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(voyagesFromState.length === 0);

  useEffect(() => {
    if (voyagesFromState.length > 0) return;

    api.get("/voyages")
      .then(({ data }) => {
        setVoyages((data.voyages || []).filter((voyage) => voyage.nombre_places >= places));
      })
      .catch((requestError) => {
        setError(requestError.response?.data?.message || "Impossible de charger les voyages.");
      })
      .finally(() => setLoading(false));
  }, [places, voyagesFromState]);

  const selectVoyage = (voyage) => {
    localStorage.setItem("nombreTickets", String(places));
    navigate("/ticket-details", { state: { voyage, tickets: places } });
  };

  return (
    <div className="min-h-screen bg-[#0A1B29] text-white">
      <header className="border-b border-white/10 bg-[#11263A] px-4 py-4 shadow-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/recherche")}
            className="flex items-center gap-2 text-[#D4AF37] hover:text-[#e3c154]"
          >
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Modifier la recherche</span>
          </button>
          <img src={logo} alt="EasyTravel" className="h-12 w-12" />
          <div className="w-10 sm:w-44" />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-7">
          <p className="text-sm font-semibold uppercase tracking-[.2em] text-[#D4AF37]">Résultats</p>
          <h1 className="mt-1 text-3xl font-black">Voyages disponibles</h1>
          <p className="mt-2 text-slate-400">Sélection pour {places} place(s).</p>
        </div>
        <VoyageCards voyages={voyages} loading={loading} error={error} onSelect={selectVoyage} />
      </main>
    </div>
  );
}
