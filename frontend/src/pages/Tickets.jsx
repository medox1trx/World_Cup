import { BsTicketPerforated } from "react-icons/bs";

export default function Tickets() {
  return (
    <div className="min-h-screen bg-[#f5f4f0] flex flex-col items-center justify-center gap-4 text-center px-6">
      <BsTicketPerforated className="text-gold text-6xl" />
      <h1 className="font-display text-5xl text-navy tracking-wide">Tickets</h1>
      <p className="text-gray-400 text-sm">Coming soon — purchase and manage your match tickets.</p>
    </div>
  );
}