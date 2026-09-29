import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import bgImage from "../assets/easy_travel_logo.png";
import logo from "../assets/easy_travel_logos.png";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/login", formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate(data.user.role === "agent" ? "/agent/dashboard" : "/dashboard", {
        replace: true,
      });
    } catch (requestError) {
      const validation = requestError.response?.data?.errors;
      setError(
        validation
          ? Object.values(validation).flat().join(" ")
          : requestError.response?.data?.message || "Email ou mot de passe incorrect."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B1526] px-4 py-12">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
        <div
          className="hidden items-end bg-cover bg-center p-8 md:flex md:w-1/2"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(7,22,34,.95), rgba(7,22,34,.15)), url(${bgImage})`,
          }}
        >
          <div>
            <img src={logo} alt="EasyTravel" className="mb-4 h-14 w-14" />
            <h2 className="text-3xl font-black text-white">Voyagez plus simplement.</h2>
            <p className="mt-2 text-slate-200">
              Retrouvez vos trajets, réservations et billets depuis un seul espace.
            </p>
          </div>
        </div>

        <div className="w-full bg-gradient-to-b from-[#172742] to-[#0B1526] p-8 text-white sm:p-10 md:w-1/2">
          <Link to="/" className="text-sm text-[#D4AF37] hover:underline">
            ← Retour au site
          </Link>

          <h1 className="mt-8 text-3xl font-black">Connexion</h1>
          <p className="mt-2 text-sm text-slate-400">Accédez à votre espace EasyTravel.</p>

          {error && (
            <div className="mt-5 rounded-xl border border-red-400/30 bg-red-500/15 p-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <label className="block text-sm text-slate-300">
              Email
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                autoComplete="email"
                required
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#081723] px-4 py-3 outline-none focus:border-[#D4AF37]"
              />
            </label>

            <label className="block text-sm text-slate-300">
              Mot de passe
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                autoComplete="current-password"
                required
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#081723] px-4 py-3 outline-none focus:border-[#D4AF37]"
              />
            </label>

            <button
              disabled={loading}
              className="w-full rounded-xl bg-[#D4AF37] py-3 font-bold text-[#081723] transition hover:bg-[#e3c154] disabled:opacity-60"
            >
              {loading ? "Connexion…" : "Se connecter"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-400">
            Pas encore de compte ?{" "}
            <Link to="/register" className="font-semibold text-[#D4AF37] hover:underline">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
