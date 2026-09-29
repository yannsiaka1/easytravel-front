import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/easy_travel_logos.png";
import { getStoredUser } from "../utils/auth";

const links = [
  { label: "Accueil", to: "/" },
  { label: "Services", to: "/services" },
  { label: "À propos", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function PublicNavbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = getStoredUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const accountPath = user?.role === "agent" ? "/agent/dashboard" : user ? "/dashboard" : "/login";
  const accountLabel = user ? "Mon espace" : "Se connecter";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#081723]/95 shadow-xl shadow-black/20 backdrop-blur-xl" : "bg-[#081723]/55 backdrop-blur-sm"
    }`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="EasyTravel - accueil">
          <img src={logo} alt="" className="h-11 w-11 rounded-xl object-contain" />
          <div className="leading-tight">
            <span className="block text-lg font-black tracking-wide text-[#D4AF37]">EasyTravel</span>
            <span className="hidden text-[11px] uppercase tracking-[0.22em] text-slate-300 sm:block">Voyagez simplement</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1.5 md:flex">
          {links.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active ? "bg-[#D4AF37] text-[#071622]" : "text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link to={accountPath} className="rounded-xl border border-[#D4AF37]/50 bg-[#D4AF37] px-5 py-2.5 text-sm font-bold text-[#071622] transition hover:-translate-y-0.5 hover:bg-[#e3c154]">
            {accountLabel}
          </Link>
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-white md:hidden" aria-label="Ouvrir le menu" aria-expanded={open}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="border-t border-white/10 bg-[#081723]/98 px-4 pb-5 pt-3 backdrop-blur-xl md:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1">
              {links.map((link) => (
                <Link key={link.to} to={link.to} className={`rounded-xl px-4 py-3 text-sm font-semibold ${location.pathname === link.to ? "bg-[#D4AF37] text-[#071622]" : "text-white hover:bg-white/10"}`}>
                  {link.label}
                </Link>
              ))}
              <Link to={accountPath} className="mt-2 rounded-xl bg-[#D4AF37] px-4 py-3 text-center text-sm font-bold text-[#071622]">
                {accountLabel}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
