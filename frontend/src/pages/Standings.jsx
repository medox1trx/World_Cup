import { FiList } from "react-icons/fi";

export default function Standings() {
  return (
    <div className="min-h-screen bg-[#f5f4f0] flex flex-col items-center justify-center gap-4 text-center px-6">
      <FiList className="text-gold text-6xl" />
      <h1 className="font-display text-5xl text-navy tracking-wide">Standings</h1>
      <p className="text-gray-400 text-sm">Coming soon — group standings and points table.</p>
    </div>
  );
}