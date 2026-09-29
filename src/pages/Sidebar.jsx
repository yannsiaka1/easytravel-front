import { Link, useLocation } from "react-router-dom";
import logo from "../assets/easy_travel_logos.png";
import { clientNavigation } from "../utils/navigation";

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/10 bg-[#081723] text-white shadow-2xl lg:block">
      <Link to="/" className="flex h-24 items-center gap-3 border-b border-white/10 px-6">
        <img src={logo} alt="" className="h-11 w-11 rounded-xl object-contain" />
        <div>
          <p className="font-black text-[#D4AF37]">EasyTravel</p>
          <p className="text-xs text-slate-400">Espace client</p>
        </div>
      </Link>

      <nav className="space-y-2 p-4">
        {clientNavigation.map(({ label, to, icon: Icon }) => {
          const active = location.pathname === to;

          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                active
                  ? "bg-[#D4AF37] text-[#081723]"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={19} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
