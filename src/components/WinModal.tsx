import { Link } from "@tanstack/react-router";

export default function WinModal() {
  return (
    <div
      className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="win-modal-title"
    >
      <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm" aria-hidden />

      <div className="relative w-full max-w-md rounded-lg border border-teal-800/60 bg-zinc-950/90 px-8 py-10 text-center shadow-xl">
        <h1 id="win-modal-title" className="text-2xl font-bold text-teal-300">
          You won!
        </h1>
        <Link to="/levels/2">Next Level</Link>
      </div>
    </div>
  )
}
