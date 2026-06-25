import { Link } from '@tanstack/react-router'
import { useRef } from 'react'
import { useGame } from '#/context/game/useGame'
import { NEXT_LEVEL_ROUTES } from '#/lib/constants/levels'
import { WIN_MODAL_CONTENT } from '#/lib/constants/winModalContent'

function CodeDiff({ before, after }: { before: string; after: string }) {
  const beforeLines = before.split('\n')
  const afterLines = after.split('\n')

  return (
    <div className="mt-3 overflow-hidden rounded border border-zinc-700 text-left font-mono text-xs">
      <div className="border-b border-zinc-700 bg-zinc-800 px-3 py-1.5 text-zinc-400 text-[11px]">
        The code: Before / After
      </div>
      <div className="bg-zinc-900 p-3 space-y-0.5">
        {beforeLines.map((line, i) => (
          <div key={`before-${i}`} className="flex gap-2">
            <span className="select-none text-red-500">−</span>
            <span className="text-red-400">{line}</span>
          </div>
        ))}
        <div className="my-2 border-t border-zinc-700" />
        {afterLines.map((line, i) => (
          <div key={`after-${i}`} className="flex gap-2">
            <span className="select-none text-green-500">+</span>
            <span className="text-green-400">{line}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function WinModal() {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const { activeLevel, state } = useGame()

  if (!activeLevel) return null;

  const content = WIN_MODAL_CONTENT[activeLevel];
  const levelData = state[activeLevel];
  const nextRoute = NEXT_LEVEL_ROUTES[activeLevel];

  return (
    <div
      className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out opacity-100 scale-100 starting:opacity-0 starting:scale-95"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="win-modal-title"
      aria-describedby="win-modal-description"
    >
      <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm" aria-hidden />

      <div className="relative w-full max-w-xl rounded-lg border border-teal-800/60 bg-zinc-950 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-4 text-center border-b border-zinc-800">
          <h1 id="win-modal-title" className="text-2xl font-bold text-teal-300">
            You made it.
          </h1>
          {content && levelData && (
            <p id="win-modal-description" className="mt-2 text-sm text-zinc-400">
              {content.statLine(levelData.timeElapsed, levelData.frictionEvents)}
            </p>
          )}
        </div>

        {content ? (
          <div className="px-8 py-6 space-y-5 max-h-[60vh] overflow-y-auto">
            {/* Reality */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">Why it matters</p>
              <p className="text-sm text-zinc-300">{content.reality}</p>
            </div>

            {/* Fix */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">How to fix it</p>
              <p className="pb-4 text-sm text-zinc-300">{content.fix}</p>
              <CodeDiff before={content.codeBefore} after={content.codeAfter} />
            </div>
          </div>
        ) : (
          <div className="px-8 py-6" />
        )}

        {/* Footer */}
        <div className="px-8 pb-8 pt-2 flex justify-center border-t border-zinc-800">
          {nextRoute ? (
            <Link
              ref={linkRef}
              to={nextRoute}
              className="inline-flex items-center gap-2 rounded border border-teal-700 bg-transparent px-6 py-2.5 text-sm text-teal-300 transition-colors hover:bg-teal-900/40 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
            >
              Next Level →
            </Link>
          ) : (
            <Link
              ref={linkRef}
              to="/"
              className="inline-flex items-center gap-2 rounded border border-teal-700 bg-transparent px-6 py-2.5 text-sm text-teal-300 transition-colors hover:bg-teal-900/40 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
            >
              See my results →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
