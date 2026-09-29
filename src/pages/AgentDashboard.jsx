import { Bus, CircleDollarSign, Clock3, TicketCheck, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { getStoredUser } from "../utils/auth";
import AgentNavbar from "./AgentNavbar";
import AgentSidebar from "./AgentSidebar";

const initialStats = {
  total_reservations: 0,
  reservations_payees: 0,
  reservations_en_attente: 0,
  total_paiements: 0,
  nombre_utilisateurs: 0,
};

export default function AgentDashboard() {
  const navigate = useNavigate();
  const user = getStoredUser();
  const [stats, setStats] = useState(initialStats);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/agent/statistiques")
      .then(({ data }) => setStats(data))
      .catch((requestError) => {
        setError(requestError.response?.data?.message || "Impossible de charger les statistiques.");
      });
  }, []);

  const metrics = [
    { label: "Réservations", value: stats.total_reservations, icon: TicketCheck },
    { label: "Payées", value: stats.reservations_payees, icon: CircleDollarSign },
    { label: "En attente", value: stats.reservations_en_attente, icon: Clock3 },
    { label: "Utilisateurs", value: stats.nombre_utilisateurs, icon: Users },
  ];

  const actions = [
    {
      icon: Bus,
      title: "Gérer les voyages",
      text: "Créer, modifier et supprimer les départs proposés aux clients.",
      to: "/agent/voyages",
    },
    {
      icon: Users,
      title: "Gérer les utilisateurs",
      text: "Consulter et administrer les comptes clients et agents.",
      to: "/agent/utilisateurs",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b1f2e] pt-16 text-white lg:pl-64">
      <AgentSidebar />
      <AgentNavbar />

      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[.2em] text-[#D4AF37]">Espace agent</p>
          <h2 className="mt-1 text-3xl font-black">Bonjour {user?.prenom || "Agent"}</h2>
          <p className="mt-2 text-slate-400">Pilotez les données essentielles d’EasyTravel.</p>
        </div>

        {error && <div className="mb-6 rounded-xl bg-red-500/10 p-4 text-red-200">{error}</div>}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map(({ label, value, icon: Icon }) => (
            <article key={label} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{label}</span>
                <Icon size={20} className="text-[#D4AF37]" />
              </div>
              <p className="mt-3 text-3xl font-black">{Number(value || 0).toLocaleString("fr-FR")}</p>
            </article>
          ))}
        </section>

        <div className="mt-8 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-5">
          <p className="text-sm text-slate-300">Paiements validés</p>
          <p className="mt-1 text-2xl font-black text-[#D4AF37]">
            {Number(stats.total_paiements || 0).toLocaleString("fr-FR")} FCFA
          </p>
        </div>

        <section className="mt-8 grid max-w-4xl gap-5 md:grid-cols-2">
          {actions.map(({ icon: Icon, title, text, to }) => (
            <button
              key={to}
              type="button"
              onClick={() => navigate(to)}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-xl transition hover:-translate-y-1 hover:border-[#D4AF37]/40"
            >
              <div className="mb-5 inline-flex rounded-xl bg-[#D4AF37]/15 p-3 text-[#D4AF37]">
                <Icon />
              </div>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
            </button>
          ))}
        </section>
      </main>
    </div>
  );
}
