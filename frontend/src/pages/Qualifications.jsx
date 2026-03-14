import { FiAward } from "react-icons/fi";

export default function Qualifications() {
  return (
    <div className="min-h-screen bg-[#f5f4f0] flex flex-col items-center justify-center gap-4 text-center px-6">
      <FiAward className="text-gold text-6xl" />
      <h1 className="font-display text-5xl text-navy tracking-wide">Qualifications</h1>
      <p className="text-gray-400 text-sm">Coming soon — qualification results by confederation.</p>
    </div>
  );
}