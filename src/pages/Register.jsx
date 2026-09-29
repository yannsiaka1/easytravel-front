import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import logo from "../assets/easy_travel_logos.png";

const initialForm = {
  nom: "",
  prenom: "",
  email: "",
  telephone: "",
  password: "",
  carte_identite: "",
};

const fields = [
  ["prenom", "Prénom", "text"],
  ["nom", "Nom", "text"],
  ["email", "Email", "email"],
  ["telephone", "Téléphone", "tel"],
  ["carte_identite", "Carte d’identité", "text"],
  ["password", "Mot de passe", "password"],
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const change = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/register", form);
      navigate("/login", { replace: true });
    } catch (requestError) {
      const validation = requestError.response?.data?.errors;
      setError(
        validation
          ? Object.values(validation).flat().join(" ")
          : requestError.response?.data?.message || "Inscription impossible."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1526] px-4 py-10 text-white">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl sm:p-10">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-sm text-[#D4AF37] hover:underline">
            ← Retour
          </Link>
          <img src={logo} alt="EasyTravel" className="h-12 w-12" />
        </div>

        <h1 className="mt-6 text-3xl font-black">Créer votre compte</h1>
        <p className="mt-2 text-slate-400">Quelques informations et votre espace voyage est prêt.</p>

        {error && (
          <div className="mt-5 rounded-xl border border-red-400/30 bg-red-500/15 p-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="mt-7 grid gap-4 sm:grid-cols-2">
          {fields.map(([name, label, type]) => (
            <label key={name} className="text-sm text-slate-300">
              {label}
              <input
                name={name}
                value={form[name]}
                onChange={change}
                type={type}
                required
                autoComplete={name === "password" ? "new-password" : undefined}
                minLength={name === "password" ? 6 : undefined}
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#081723] px-4 py-3 text-white outline-none focus:border-[#D4AF37]"
              />
            </label>
          ))}

          <button
            disabled={loading}
            className="mt-2 rounded-xl bg-[#D4AF37] py-3 font-bold text-[#081723] hover:bg-[#e3c154] disabled:opacity-60 sm:col-span-2"
          >
            {loading ? "Création…" : "Créer mon compte"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-400">
          Déjà inscrit ?{" "}
          <Link to="/login" className="font-semibold text-[#D4AF37] hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
