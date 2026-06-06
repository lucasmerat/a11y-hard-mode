import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export default function WinModal() {
  const linkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (linkRef.current) {
      linkRef.current.focus()
    }
  }, [])


  return (
    <div
      className="transition-all duration-300 starting:opacity-0 opacity-100 starting:scale-95 scale-100 ease-out pointer-events-auto fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="win-modal-title"
    >
      <div className="transition-all duration-300 starting:opacity-0 opacity-90 absolute inset-0 bg-zinc-950 backdrop-blur-sm" aria-hidden />

      <div className="relative w-full max-w-md rounded-lg border border-teal-800/60 bg-zinc-950/90 px-8 py-10 text-center shadow-xl">
        <h1 id="win-modal-title" className="text-2xl font-bold text-teal-300">
          You won!
        </h1>
        <Link ref={linkRef} to="/levels/2">Next Level</Link>
      </div>
    </div>
  )
}
