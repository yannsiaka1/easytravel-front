import { Pencil, Trash2, UserPlus, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";
import AgentNavbar from "./AgentNavbar";
import AgentSidebar from "./AgentSidebar";

const emptyForm = {
  nom: "",
  prenom: "",
  carte_identite: "",
  telephone: "",
  email: "",
  password: "",
  role: "client",
};

const userFields = [
  ["nom", "Nom", "text"],
  ["prenom", "Prénom", "text"],
  ["carte_identite", "Carte d’identité", "text"],
  ["telephone", "Téléphone", "tel"],
  ["email", "Email", "email"],
];

export default function Utilisateurs() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await api.get("/agent/utilisateurs");
      setUsers(data.utilisateurs || []);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Impossible de charger les utilisateurs.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const change = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const reset = () => {
    setForm(emptyForm);
    setEditing(null);
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);

    const payload = { ...form };
    if (editing && !payload.password) delete payload.password;

    try {
      if (editing) {
        await api.put(`/agent/utilisateurs/${editing.id}`, payload);
        setMessage("Utilisateur modifié avec succès.");
      } else {
        await api.post("/agent/utilisateurs", payload);
        setMessage("Utilisateur créé avec succès.");
      }

      reset();
      await loadUsers();
    } catch (requestError) {
      const validation = requestError.response?.data?.errors;
      setError(
        validation
          ? Object.values(validation).flat().join(" ")
          : requestError.response?.data?.message || "Une erreur est survenue."
      );
    } finally {
      setSaving(false);
    }
  };

  const edit = (user) => {
    setEditing(user);
    setForm({
      nom: user.nom || "",
      prenom: user.prenom || "",
      carte_identite: user.carte_identite || "",
      telephone: user.telephone || "",
      email: user.connexion?.email || "",
      password: "",
      role: user.role || "client",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (user) => {
    if (!window.confirm(`Supprimer ${user.prenom} ${user.nom} ?`)) return;

    setError("");
    setMessage("");

    try {
      await api.delete(`/agent/utilisateurs/${user.id}`);
      setMessage("Utilisateur supprimé.");
      await loadUsers();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Suppression impossible.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1f2e] pt-16 text-white lg:pl-64">
      <AgentSidebar />
      <AgentNavbar />

      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <div className="mb-7">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Administration</p>
          <h2 className="mt-1 text-3xl font-black">Utilisateurs</h2>
          <p className="mt-2 text-slate-400">Gérez les comptes clients et agents depuis un seul écran.</p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-400/30 bg-red-500/15 p-4 text-red-200">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-5 rounded-xl border border-emerald-400/30 bg-emerald-500/15 p-4 text-emerald-200">
            {message}
          </div>
        )}

        <section className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-xl font-bold">
              <UserPlus className="text-[#D4AF37]" />
              {editing ? "Modifier l’utilisateur" : "Créer un utilisateur"}
            </h3>
            {editing && (
              <button type="button" onClick={reset} className="rounded-lg p-2 hover:bg-white/10" aria-label="Annuler la modification">
                <X />
              </button>
            )}
          </div>

          <form onSubmit={submit} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {userFields.map(([name, label, type]) => (
              <label key={name} className="text-sm text-slate-300">
                {label}
                <input
                  name={name}
                  type={type}
                  value={form[name]}
                  onChange={change}
                  required
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#081723] px-4 py-3 text-white outline-none focus:border-[#D4AF37]"
                />
              </label>
            ))}

            <label className="text-sm text-slate-300">
              {editing ? "Nouveau mot de passe (optionnel)" : "Mot de passe"}
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={change}
                required={!editing}
                minLength={form.password ? 6 : undefined}
                autoComplete="new-password"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#081723] px-4 py-3 text-white outline-none focus:border-[#D4AF37]"
              />
            </label>

            <label className="text-sm text-slate-300">
              Rôle
              <select
                name="role"
                value={form.role}
                onChange={change}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#081723] px-4 py-3 text-white"
              >
                <option value="client">Client</option>
                <option value="agent">Agent</option>
              </select>
            </label>

            <div className="flex items-end">
              <button
                disabled={saving}
                className="w-full rounded-xl bg-[#D4AF37] px-5 py-3 font-bold text-[#081723] hover:bg-[#e3c154] disabled:opacity-60"
              >
                {saving ? "Enregistrement…" : editing ? "Enregistrer" : "Créer"}
              </button>
            </div>
          </form>
        </section>

        <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl">
          <div className="border-b border-white/10 px-6 py-4">
            <h3 className="font-bold">
              Comptes enregistrés
              <span className="ml-2 text-sm font-normal text-slate-400">{users.length}</span>
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-black/10 text-left text-slate-400">
                <tr>
                  {["Nom", "Email", "Téléphone", "Rôle", "Actions"].map((heading) => (
                    <th key={heading} className="px-6 py-3 font-semibold">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {loading ? (
                  <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-400">Chargement…</td></tr>
                ) : users.length === 0 ? (
                  <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-400">Aucun utilisateur.</td></tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-white/5">
                      <td className="px-6 py-4 font-semibold">{user.prenom} {user.nom}</td>
                      <td className="px-6 py-4 text-slate-300">{user.connexion?.email || "—"}</td>
                      <td className="px-6 py-4">{user.telephone}</td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-[#D4AF37]/15 px-3 py-1 text-xs font-bold uppercase text-[#D4AF37]">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button type="button" onClick={() => edit(user)} className="rounded-lg bg-blue-500/15 p-2 text-blue-300 hover:bg-blue-500/25" title="Modifier">
                            <Pencil size={17} />
                          </button>
                          <button type="button" onClick={() => remove(user)} className="rounded-lg bg-red-500/15 p-2 text-red-300 hover:bg-red-500/25" title="Supprimer">
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
