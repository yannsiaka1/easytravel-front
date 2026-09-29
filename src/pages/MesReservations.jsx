import { ArrowLeft, CheckCircle2, Clock3, CreditCard, TicketCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import logo from "../assets/easy_travel_logos.png";

export default function MesReservations() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/reservations")
      .then(({ data }) => setReservations(data))
      .catch((requestError) => {
        setError(requestError.response?.data?.message || "Impossible de charger les réservations.");
      })
      .finally(() => setLoading(false));
  }, []);

  const payReservation = (reservationId) => {
    localStorage.setItem("reservationId", String(reservationId));
    navigate("/paiement", { state: { reservationId } });
  };

  return (
    <div className="min-h-screen bg-[#0A1B29] text-white">
      <header className="border-b border-white/10 bg-[#11263A] px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-[#D4AF37]"
          >
            <ArrowLeft size={19} />
            Dashboard
          </button>
          <img src={logo} alt="EasyTravel" className="h-12 w-12" />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[.2em] text-[#D4AF37]">Historique</p>
          <h1 className="mt-1 text-3xl font-black">Mes réservations</h1>
        </div>

        {loading ? (
          <p className="py-12 text-center text-slate-400">Chargement…</p>
        ) : error ? (
          <div className="rounded-xl bg-red-500/15 p-4 text-red-200">{error}</div>
        ) : reservations.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-slate-400">
            Aucune réservation pour le moment.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {reservations.map((reservation) => {
              const paid = reservation.statut_paiement === "paye";

              return (
                <article
                  key={reservation.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[.16em] text-slate-400">
                        Réservation #{reservation.id}
                      </p>
                      <h2 className="mt-1 text-lg font-bold text-[#D4AF37]">
                        {reservation.ville_depart} → {reservation.destination}
                      </h2>
                    </div>
                    {paid ? (
                      <CheckCircle2 className="text-emerald-400" />
                    ) : (
                      <Clock3 className="text-amber-400" />
                    )}
                  </div>

                  <dl className="mt-5 space-y-2 text-sm text-slate-300">
                    <div className="flex justify-between">
                      <dt>Date</dt>
                      <dd>{new Date(reservation.date_voyage).toLocaleDateString("fr-FR")}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Classe</dt>
                      <dd className="uppercase">{reservation.classe}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Places</dt>
                      <dd>{reservation.nb_places}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Statut</dt>
                      <dd className={paid ? "font-semibold text-emerald-400" : "font-semibold text-amber-400"}>
                        {paid ? "Payé" : "En attente"}
                      </dd>
                    </div>

                    {reservation.ticket?.code_unique && (
                      <div className="flex justify-between border-t border-white/10 pt-3">
                        <dt className="flex items-center gap-1">
                          <TicketCheck size={15} />
                          Billet
                        </dt>
                        <dd className="font-mono text-[#D4AF37]">{reservation.ticket.code_unique}</dd>
                      </div>
                    )}
                  </dl>

                  {!paid && (
                    <button
                      type="button"
                      onClick={() => payReservation(reservation.id)}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-2.5 font-semibold text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#081723]"
                    >
                      <CreditCard size={17} />
                      Payer cette réservation
                    </button>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
