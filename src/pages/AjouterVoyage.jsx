import { Navigate } from "react-router-dom";

// Ancienne page conservée pour compatibilité avec les anciens favoris.
// La gestion des voyages est maintenant centralisée dans /agent/voyages.
export default function AjouterVoyage() {
  return <Navigate to="/agent/voyages" replace />;
}
