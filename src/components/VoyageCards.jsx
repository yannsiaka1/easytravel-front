import { CalendarDays, MapPin, UsersRound } from "lucide-react";

export default function VoyageCards({ voyages, loading, error, onSelect }) {
  if (loading) {
    return (
      <div className="py-16 text-center text-slate-400">
        <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-[#D4AF37] border-r-transparent" />
        <p className="mt-4">Chargement des voyages…</p>
      </div>
    );
  }

  if (error) {
    return <div className="rounded-xl border border-red-400/25 bg-red-500/10 p-4 text-red-200">{error}</div>;
  }

  if (voyages.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-slate-400">
        Aucun voyage disponible pour le moment.
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {voyages.map((voyage) => {
        const departure = new Date(voyage.date_depart);

        return (
          <article
            key={voyage.id}
            className="overflow-hidden rounded-2xl border border-white/10 bg-[#11263A] shadow-xl transition hover:-translate-y-1 hover:border-[#D4AF37]/35"
          >
            <div className="border-b border-white/10 bg-white/[.03] p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-[#D4AF37]/15 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#D4AF37]">
                  {voyage.classe}
                </span>
                <strong className="text-lg text-white">
                  {Number(voyage.prix).toLocaleString("fr-FR")} FCFA
                </strong>
              </div>
              <h2 className="mt-4 flex items-center gap-2 text-xl font-black text-white">
                <MapPin size={19} className="text-[#D4AF37]" />
                {voyage.ville_depart} → {voyage.ville_arrivee}
              </h2>
            </div>

            <div className="space-y-4 p-5 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <CalendarDays size={18} className="text-[#D4AF37]" />
                <span>
                  {departure.toLocaleDateString("fr-FR")} à {departure.toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <UsersRound size={18} className="text-[#D4AF37]" />
                <span>{voyage.nombre_places} place(s) disponible(s)</span>
              </div>
              {voyage.agent && (
                <p className="text-xs text-slate-500">
                  Géré par {voyage.agent.prenom} {voyage.agent.nom}
                </p>
              )}

              <button
                type="button"
                onClick={() => onSelect(voyage)}
                className="mt-2 w-full rounded-xl bg-[#D4AF37] px-4 py-3 font-bold text-[#081723] hover:bg-[#e3c154]"
              >
                Sélectionner ce voyage
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
