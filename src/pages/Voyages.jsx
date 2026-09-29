import { format } from "date-fns";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";
import AgentNavbar from "./AgentNavbar";
import AgentSidebar from "./AgentSidebar";

const emptyForm = {
  ville_depart: "",
  ville_arrivee: "",
  date_depart: "",
  prix: "",
  nombre_places: "",
  classe: "classique",
};

export default function Voyages() {
  const [voyages, setVoyages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadVoyages = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/voyages");
      setVoyages(data.voyages || []);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Impossible de charger les voyages.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVoyages();
  }, [loadVoyages]);

  const change = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const closeForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const openCreate = () => {
    setError("");
    setSuccess("");
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (voyage) => {
    setError("");
    setSuccess("");
    setEditingId(voyage.id);
    setShowForm(true);
    setForm({
      ville_depart: voyage.ville_depart || "",
      ville_arrivee: voyage.ville_arrivee || "",
      date_depart: voyage.date_depart ? voyage.date_depart.slice(0, 16) : "",
      prix: voyage.prix || "",
      nombre_places: voyage.nombre_places || "",
      classe: voyage.classe || "classique",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      ...form,
      prix: Number(form.prix),
      nombre_places: Number(form.nombre_places),
    };

    try {
      if (editingId) {
        await api.put(`/voyages/${editingId}`, payload);
        setSuccess("Voyage modifié avec succès.");
      } else {
        await api.post("/voyages", payload);
        setSuccess("Voyage ajouté avec succès.");
      }

      closeForm();
      await loadVoyages();
    } catch (requestError) {
      const validation = requestError.response?.data?.errors;
      setError(
        validation
          ? Object.values(validation).flat().join(" ")
          : requestError.response?.data?.message || "Impossible d’enregistrer le voyage."
      );
    } finally {
      setSaving(false);
    }
  };

  const remove = async (voyage) => {
    if (!window.confirm(`Supprimer le voyage ${voyage.ville_depart} → ${voyage.ville_arrivee} ?`)) return;

    setError("");
    setSuccess("");

    try {
      await api.delete(`/voyages/${voyage.id}`);
      setSuccess("Voyage supprimé.");
      await loadVoyages();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Suppression impossible.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1f2e] pt-16 text-white lg:pl-64">
      <AgentSidebar />
      <AgentNavbar />

      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[.2em] text-[#D4AF37]">Exploitation</p>
            <h2 className="mt-1 text-3xl font-black">Gestion des voyages</h2>
            <p className="mt-2 text-slate-400">Créez et maintenez les départs proposés aux clients.</p>
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 font-bold text-[#081723] hover:bg-[#e3c154]"
          >
            <Plus size={18} />
            Ajouter un voyage
          </button>
        </div>

        {error && <div className="mb-5 rounded-xl bg-red-500/10 p-4 text-red-200">{error}</div>}
        {success && <div className="mb-5 rounded-xl bg-emerald-500/10 p-4 text-emerald-200">{success}</div>}

        {showForm && (
          <section className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-xl font-bold">{editingId ? "Modifier le voyage" : "Nouveau voyage"}</h3>
              <button type="button" onClick={closeForm} className="rounded-lg p-2 hover:bg-white/10" aria-label="Fermer">
                <X size={19} />
              </button>
            </div>

            <form onSubmit={submit} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Field label="Ville de départ">
                <input name="ville_depart" value={form.ville_depart} onChange={change} required />
              </Field>
              <Field label="Ville d’arrivée">
                <input name="ville_arrivee" value={form.ville_arrivee} onChange={change} required />
              </Field>
              <Field label="Départ">
                <input name="date_depart" type="datetime-local" value={form.date_depart} onChange={change} required />
              </Field>
              <Field label="Prix (FCFA)">
                <input name="prix" type="number" min="0" step="100" value={form.prix} onChange={change} required />
              </Field>
              <Field label="Places disponibles">
                <input name="nombre_places" type="number" min="1" step="1" value={form.nombre_places} onChange={change} required />
              </Field>
              <label className="text-sm text-slate-300">
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

              <div className="flex gap-3 md:col-span-2 lg:col-span-3 lg:justify-end">
                <button type="button" onClick={closeForm} className="rounded-xl border border-white/15 px-5 py-3 text-slate-200 hover:bg-white/5">
                  Annuler
                </button>
                <button disabled={saving} className="rounded-xl bg-[#D4AF37] px-5 py-3 font-bold text-[#081723] disabled:opacity-60">
                  {saving ? "Enregistrement…" : editingId ? "Mettre à jour" : "Enregistrer"}
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl">
          <div className="border-b border-white/10 px-5 py-4">
            <h3 className="font-bold">Voyages à venir <span className="ml-2 text-sm font-normal text-slate-400">{voyages.length}</span></h3>
          </div>

          {loading ? (
            <p className="p-10 text-center text-slate-400">Chargement…</p>
          ) : voyages.length === 0 ? (
            <p className="p-10 text-center text-slate-400">Aucun voyage à venir.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-black/10 text-left text-slate-400">
                  <tr>
                    {['Trajet', 'Date', 'Prix', 'Places', 'Classe', 'Actions'].map((heading) => (
                      <th key={heading} className="px-5 py-3 font-semibold">{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {voyages.map((voyage) => (
                    <tr key={voyage.id} className="hover:bg-white/5">
                      <td className="px-5 py-4 font-semibold">{voyage.ville_depart} → {voyage.ville_arrivee}</td>
                      <td className="whitespace-nowrap px-5 py-4 text-slate-300">{format(new Date(voyage.date_depart), "dd/MM/yyyy HH:mm")}</td>
                      <td className="whitespace-nowrap px-5 py-4">{Number(voyage.prix).toLocaleString("fr-FR")} FCFA</td>
                      <td className="px-5 py-4">{voyage.nombre_places}</td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-[#D4AF37]/15 px-3 py-1 text-xs font-bold uppercase text-[#D4AF37]">{voyage.classe}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button type="button" onClick={() => openEdit(voyage)} className="rounded-lg bg-blue-500/15 p-2 text-blue-300 hover:bg-blue-500/25" title="Modifier">
                            <Pencil size={17} />
                          </button>
                          <button type="button" onClick={() => remove(voyage)} className="rounded-lg bg-red-500/15 p-2 text-red-300 hover:bg-red-500/25" title="Supprimer">
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="text-sm text-slate-300 [&_input]:mt-1.5 [&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-white/10 [&_input]:bg-[#081723] [&_input]:px-4 [&_input]:py-3 [&_input]:text-white [&_input]:outline-none [&_input]:focus:border-[#D4AF37]">
      {label}
      {children}
    </label>
  );
}
