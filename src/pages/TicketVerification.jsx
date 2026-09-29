import { ArrowLeft, ArrowRight, MapPin, Ticket } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
import logo from "../assets/easy_travel_logos.png";
import { getStoredUser } from "../utils/auth";

export default function TicketDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const voyage = location.state?.voyage;
  const user = location.state?.user || getStoredUser();
  const places = Number(location.state?.tickets || localStorage.getItem("nombreTickets") || 1);

  if (!voyage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A1B29] px-4 text-white">
        <div className="text-center">
          <p>Aucun voyage sélectionné.</p>
          <button onClick={() => navigate("/recherche")} className="mt-4 text-[#D4AF37]">
            Revenir à la recherche
          </button>
        </div>
      </div>
    );
  }

  const departureDate = new Date(voyage.date_depart);
  const total = Number(voyage.prix || 0) * places;

  const confirm = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await api.post("/reservations", {
        voyage_id: voyage.id,
        nb_places: places,
      });

      localStorage.setItem("reservationId", String(data.reservation.id));
      navigate("/paiement", {
        state: { reservationId: data.reservation.id },
      });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Impossible de créer la réservation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1B29] px-4 py-8 text-white">
      <div className="mx-auto max-w-2xl">
        <button onClick={() => navigate(-1)} className="mb-5 flex items-center gap-2 text-[#D4AF37]">
          <ArrowLeft size={18} />
          Retour
        </button>

        <div className="rounded-3xl border border-white/10 bg-[#11263A] p-6 shadow-2xl sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[.2em] text-[#D4AF37]">Récapitulatif</p>
              <h1 className="mt-1 text-2xl font-black">Votre voyage</h1>
            </div>
            <img src={logo} alt="EasyTravel" className="h-12 w-12" />
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/5 p-4">
              <MapPin className="mb-2 text-[#D4AF37]" />
              <p className="font-bold">{voyage.ville_depart} → {voyage.ville_arrivee}</p>
              <p className="mt-1 text-sm text-slate-400">
                {departureDate.toLocaleDateString("fr-FR")} à {departureDate.toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 p-4">
              <Ticket className="mb-2 text-[#D4AF37]" />
              <p className="font-bold">
                {places} place{places > 1 ? "s" : ""} · {voyage.classe?.toUpperCase()}
              </p>
              <p className="mt-1 text-sm text-slate-400">
                {Number(voyage.prix).toLocaleString("fr-FR")} FCFA / place
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-5">
            <div className="flex justify-between gap-4">
              <span className="text-slate-300">Voyageur</span>
              <strong>{user?.prenom} {user?.nom}</strong>
            </div>
            <div className="mt-3 flex justify-between text-lg">
              <span>Total</span>
              <strong className="text-[#D4AF37]">{total.toLocaleString("fr-FR")} FCFA</strong>
            </div>
          </div>

          {error && <p className="mt-4 rounded-xl bg-red-500/15 p-3 text-sm text-red-200">{error}</p>}

          <button
            onClick={confirm}
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] py-3 font-bold text-[#081723] hover:bg-[#e3c154] disabled:opacity-60"
          >
            {loading ? "Création…" : "Continuer vers le paiement"}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
