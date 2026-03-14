import { GiSoccerBall } from "react-icons/gi";

export default function Teams() {
  return (
    <div className="min-h-screen bg-[#f5f4f0] flex flex-col items-center justify-center gap-4 text-center px-6">
      <GiSoccerBall className="text-gold text-6xl" />
      <h1 className="font-display text-5xl text-navy tracking-wide">Teams</h1>
      <p className="text-gray-400 text-sm">Coming soon — all 48 qualified nations.</p>
    </div>
  );
}