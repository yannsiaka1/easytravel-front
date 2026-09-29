import { Bus, Search, TicketCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getStoredUser } from "../utils/auth";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = getStoredUser();
  const cards = [
    {
      icon: Search,
      title: "Rechercher un voyage",
      text: "Trouvez un trajet par ville, date et classe.",
      to: "/recherche",
    },
    {
      icon: Bus,
      title: "Tous les voyages",
      text: "Consultez les départs actuellement disponibles.",
      to: "/voyages",
    },
    {
      icon: TicketCheck,
      title: "Mes réservations",
      text: "Retrouvez vos réservations, paiements et billets.",
      to: "/mes-reservations",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b1f2e] pt-16 text-white lg:pl-64">
      <Sidebar />
      <Navbar />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[.2em] text-[#D4AF37]">Bienvenue</p>
          <h2 className="mt-1 text-3xl font-black">{user?.prenom || "Voyageur"}, où partons-nous ?</h2>
          <p className="mt-2 text-slate-400">Gérez votre prochain trajet depuis votre espace EasyTravel.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cards.map(({ icon: Icon, title, text, to }) => (
            <button
              key={title}
              type="button"
              onClick={() => navigate(to)}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-xl transition hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-white/[.07]"
            >
              <div className="mb-5 inline-flex rounded-xl bg-[#D4AF37]/15 p-3 text-[#D4AF37]">
                <Icon />
              </div>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
