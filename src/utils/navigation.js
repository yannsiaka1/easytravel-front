import { BarChart3, Bus, Home, Search, TicketCheck, Users } from "lucide-react";

export const clientNavigation = [
  { label: "Accueil", to: "/dashboard", icon: Home },
  { label: "Rechercher", to: "/recherche", icon: Search },
  { label: "Voyages", to: "/voyages", icon: Bus },
  { label: "Mes réservations", to: "/mes-reservations", icon: TicketCheck },
];

export const agentNavigation = [
  { label: "Dashboard", to: "/agent/dashboard", icon: BarChart3 },
  { label: "Voyages", to: "/agent/voyages", icon: Bus },
  { label: "Utilisateurs", to: "/agent/utilisateurs", icon: Users },
];
