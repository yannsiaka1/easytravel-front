import { LogOut, Menu, UserRound, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { clearAuth, getStoredUser } from "../utils/auth";
import { clientNavigation } from "../utils/navigation";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getStoredUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const displayName = [user?.prenom, user?.nom].filter(Boolean).join(" ") || "Client";

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch {
      // Le token local doit être supprimé même si le réseau ne répond pas.
    }

    clearAuth();
    navigate("/login", { replace: true });
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-[#0b1f2e]/95 text-white shadow-lg backdrop-blur lg:left-64">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="rounded-xl p-2 text-slate-200 hover:bg-white/10 lg:hidden"
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 sm:text-xs">Espace client</p>
            <h1 className="font-bold">Tableau de bord</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 rounded-full bg-white/5 px-4 py-2 sm:flex">
            <UserRound size={17} className="text-[#D4AF37]" />
            <span className="text-sm font-semibold">{displayName}</span>
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-xl p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
            title="Se déconnecter"
          >
            <LogOut size={19} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-white/10 bg-[#081723] p-3 lg:hidden">
          {clientNavigation.map(({ label, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${
                location.pathname === to
                  ? "bg-[#D4AF37] text-[#081723]"
                  : "text-slate-200 hover:bg-white/10"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
