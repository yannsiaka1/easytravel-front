import { ArrowLeft, CreditCard } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/axios";

const createReference = () => `ET-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export default function Paiement() {
  const navigate = useNavigate();
  const location = useLocation();
  const [reservation, setReservation] = useState(null);
  const [mode, setMode] = useState("carte");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const reservationId = useMemo(
    () => location.state?.reservationId || localStorage.getItem("reservationId"),
    [location.state]
  );

  useEffect(() => {
    const endpoint = reservationId
      ? `/reservations/${reservationId}`
      : "/reservation-a-payer";

    api.get(endpoint)
      .then(({ data }) => {
        setReservation(data);
        localStorage.setItem("reservationId", String(data.id));
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Aucune réservation en attente.");
      })
      .finally(() => setLoading(false));
  }, [reservationId]);

  const submit = async (event) => {
    event.preventDefault();
    if (!reservation || processing) return;

    setProcessing(true);

    try {
      const { data } = await api.post("/paiement", {
        reservation_id: reservation.id,
        mode_paiement: mode,
        reference: createReference(),
      });

      localStorage.removeItem("reservationId");
      toast.success(data.message || "Paiement validé.");
      setTimeout(() => navigate("/mes-reservations", { replace: true }), 700);
    } catch (error) {
      toast.error(error.response?.data?.message || "Le paiement a échoué.");
      setProcessing(false);
    }
  };

  const amount = reservation
    ? Number(reservation.voyage?.prix || 0) * Number(reservation.nb_places || 0)
    : 0;

  return (
    <div className="min-h-screen bg-[#0A1B29] px-4 py-8 text-white">
      <ToastContainer theme="dark" />
      <div className="mx-auto max-w-xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-5 flex items-center gap-2 text-[#D4AF37]"
        >
          <ArrowLeft size={18} />
          Retour
        </button>

        <div className="rounded-3xl border border-white/10 bg-[#11263A] p-7 shadow-2xl">
          <CreditCard className="text-[#D4AF37]" size={34} />
          <h1 className="mt-3 text-2xl font-black">Paiement</h1>
          <p className="mt-1 text-sm text-slate-400">
            Simulation académique, aucun débit réel n’est effectué.
          </p>

          {loading ? (
            <p className="py-10 text-center text-slate-400">Chargement…</p>
          ) : !reservation ? (
            <p className="py-10 text-center text-slate-400">Aucune réservation à payer.</p>
          ) : reservation.statut_paiement === "paye" ? (
            <div className="mt-7 rounded-2xl bg-emerald-500/10 p-5 text-emerald-200">
              Cette réservation est déjà payée.
            </div>
          ) : (
            <form onSubmit={submit} className="mt-7 space-y-5">
              <div className="rounded-2xl bg-white/5 p-5">
                <div className="flex justify-between gap-4 text-sm text-slate-300">
                  <span>
                    {reservation.voyage?.ville_depart} → {reservation.voyage?.ville_arrivee}
                  </span>
                  <span>{reservation.nb_places} place(s)</span>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <span>Total</span>
                  <strong className="text-2xl text-[#D4AF37]">
                    {amount.toLocaleString("fr-FR")} FCFA
                  </strong>
                </div>
              </div>

              <label className="block text-sm text-slate-300">
                Mode de paiement
                <select
                  value={mode}
                  onChange={(event) => setMode(event.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#081723] px-4 py-3 text-white"
                >
                  <option value="carte">Carte bancaire</option>
                  <option value="mobile_money">Mobile Money</option>
                </select>
              </label>

              <button
                disabled={processing}
                className="w-full rounded-xl bg-[#D4AF37] py-3 font-bold text-[#081723] hover:bg-[#e3c154] disabled:opacity-60"
              >
                {processing ? "Traitement…" : "Confirmer le paiement"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
