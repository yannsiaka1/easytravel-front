import TripSearchForm from "../components/TripSearchForm";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function RechercheDashboard() {
  return (
    <div className="min-h-screen bg-[#0A1B29] pt-16 text-white lg:pl-64">
      <Sidebar />
      <Navbar />
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 sm:p-8">
        <TripSearchForm />
      </main>
    </div>
  );
}
