import { MdOutlineEmojiEvents } from "react-icons/md";

export default function Matches() {
  return (
    <div className="min-h-screen bg-[#f5f4f0] flex flex-col items-center justify-center gap-4 text-center px-6">
      <MdOutlineEmojiEvents className="text-gold text-6xl" />
      <h1 className="font-display text-5xl text-navy tracking-wide">Matches</h1>
      <p className="text-gray-400 text-sm">Coming soon — full match schedule with live scores.</p>
    </div>
  );
}