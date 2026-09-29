import { Bus, CalendarDays, MapPin, Ticket } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/axios";

const today = () => new Date().toISOString().split("T")[0];

export default function TripSearchForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    ville_depart: "",
    ville_arrivee: "",
    date_voyage: "",
    classe: "classique",
    nb_places: 1,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);

  const change = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: name === "nb_places" ? Math.max(1, Number(value) || 1) : value,
    }));
  };

  const openResults = (voyages, places, dateVoyage = null) => {
    localStorage.setItem("nombreTickets", String(places));
    navigate("/liste-voyages", {
      state: { voyages, tickets: places, dateVoyage },
    });
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/reservations/disponibles", form);
      const voyages = data.voyages || [];

      if (voyages.length === 0) {
        setError("Aucun voyage ne correspond à votre recherche.");
        return;
      }

      openResults(voyages, form.nb_places, form.date_voyage);
    } catch (requestError) {
      const validation = requestError.response?.data?.errors;
      setError(
        validation
          ? Object.values(validation).flat().join(" ")
          : requestError.response?.data?.message || "Impossible d’effectuer la recherche."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadAll = async () => {
    setError("");

    const { value } = await Swal.fire({
      title: "Nombre de places",
      input: "number",
      inputLabel: "Combien de places souhaitez-vous réserver ?",
      inputValue: 1,
      inputAttributes: { min: 1, step: 1 },
      showCancelButton: true,
      confirmButtonText: "Afficher les voyages",
      cancelButtonText: "Annuler",
      background: "#0A1B29",
      color: "#fff",
      confirmButtonColor: "#D4AF37",
    });

    const places = Number(value);
    if (!value || places < 1) return;

    setLoadingAll(true);

    try {
      const { data } = await api.get("/voyages");
      const voyages = (data.voyages || []).filter((voyage) => voyage.nombre_places >= places);

      if (voyages.length === 0) {
        setError("Aucun voyage ne dispose actuellement d’assez de places.");
        return;
      }

      openResults(voyages, places);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Impossible de charger les voyages.");
    } finally {
      setLoadingAll(false);
    }
  };

  return (
    <section className="w-full max-w-3xl rounded-3xl border border-white/10 bg-[#11263A] p-5 shadow-2xl sm:p-8">
      <div className="mb-7">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Réservation</p>
        <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">Rechercher un voyage</h2>
        <p className="mt-2 text-sm text-slate-400">Choisissez votre trajet, votre classe et le nombre de places.</p>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-400/25 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
        <Field icon={MapPin} label="Ville de départ">
          <input
            name="ville_depart"
            value={form.ville_depart}
            onChange={change}
            placeholder="Ex. Dakar"
            required
            className="field-input"
          />
        </Field>

        <Field icon={Bus} label="Ville d’arrivée">
          <input
            name="ville_arrivee"
            value={form.ville_arrivee}
            onChange={change}
            placeholder="Ex. Saint-Louis"
            required
            className="field-input"
          />
        </Field>

        <Field icon={CalendarDays} label="Date du voyage">
          <input
            name="date_voyage"
            type="date"
            min={today()}
            value={form.date_voyage}
            onChange={change}
            required
            className="field-input [color-scheme:dark]"
          />
        </Field>

        <Field icon={Ticket} label="Nombre de places">
          <input
            name="nb_places"
            type="number"
            min="1"
            value={form.nb_places}
            onChange={change}
            required
            className="field-input"
          />
        </Field>

        <label className="text-sm text-slate-300 sm:col-span-2">
          Classe
          <select
            name="classe"
            value={form.classe}
            onChange={change}
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#081723] px-4 py-3 text-white outline-none focus:border-[#D4AF37]"
          >
            <option value="classique">Classique</option>
            <option value="vip">VIP</option>
          </select>
        </label>

        <button
          disabled={loading}
          className="rounded-xl bg-[#D4AF37] px-5 py-3 font-bold text-[#081723] transition hover:bg-[#e3c154] disabled:opacity-60 sm:col-span-2"
        >
          {loading ? "Recherche…" : "Rechercher"}
        </button>

        <button
          type="button"
          onClick={loadAll}
          disabled={loadingAll}
          className="rounded-xl border border-[#D4AF37]/40 px-5 py-3 font-bold text-[#D4AF37] transition hover:bg-[#D4AF37]/10 disabled:opacity-60 sm:col-span-2"
        >
          {loadingAll ? "Chargement…" : "Voir tous les voyages disponibles"}
        </button>
      </form>
    </section>
  );
}

function Field({ icon: Icon, label, children }) {
  return (
    <label className="text-sm text-slate-300">
      {label}
      <div className="relative mt-1.5">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" size={18} />
        <div className="[&_.field-input]:w-full [&_.field-input]:rounded-xl [&_.field-input]:border [&_.field-input]:border-white/10 [&_.field-input]:bg-[#081723] [&_.field-input]:py-3 [&_.field-input]:pl-11 [&_.field-input]:pr-4 [&_.field-input]:text-white [&_.field-input]:outline-none [&_.field-input]:placeholder:text-slate-500 [&_.field-input]:focus:border-[#D4AF37]">
          {children}
        </div>
      </div>
    </label>
  );
}
