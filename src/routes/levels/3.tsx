import { createFileRoute } from '@tanstack/react-router'
import { useGame } from '#/context/game/useGame'
import { incrementCompletions } from '#/lib/appwrite'

export const Route = createFileRoute('/levels/3')({
  component: Level3,
})

function Level3() {
  const { completeLevel } = useGame()

  function handleWin() {
    completeLevel('level3')
    incrementCompletions().catch(() => {
      // Fire-and-forget — a failed increment shouldn't affect the game
    })
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-zinc-400 text-sm">Level 3 — coming soon</p>
      {/* TODO: replace with real level completion trigger */}
      <button
        type="button"
        onClick={handleWin}
        className="text-sm px-4 py-2 border border-zinc-600 text-zinc-300 rounded hover:bg-zinc-800 transition-colors"
      >
        [dev] complete game
      </button>
    </div>
  )
}
