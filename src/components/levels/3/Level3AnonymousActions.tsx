import { useState } from 'react'
import { useGame } from '#/context/game/useGame'
import { LEVELS_IDS } from '#/lib/constants/levels'
import WinModal from '#/components/WinModal'
import GiveUpButton from '#/components/GiveUpButton'
import clsx from 'clsx'
import { GAME_PHASES, INITIAL_ORDER, type ButtonId } from '#/lib/constants/level3'

// 48px buttons (size-12) with an 8px gap → each slot is 56px wide
const BUTTON_STRIDE_PX = 56

const REQUIRED_PLEDGE = "I pledge to always design for all users, keeping in mind accessibility and usability for everyone."


export function shuffleStep(order: ButtonId[]): ButtonId[] {
  const next = [...order]
  const i = Math.floor(Math.random() * next.length)
  const offset = 1 + Math.floor(Math.random() * (next.length - 1))
  const j = (i + offset) % next.length
    ;[next[i], next[j]] = [next[j], next[i]]
  return next
}

export default function Level3AnonymousActions() {
  const { incrementFriction, completeLevel } = useGame()
  const level3Completed = useGame().state.level3.completed
  const timeElapsed = useGame().state.level3.timeElapsed

  const [order, setOrder] = useState<ButtonId[]>(INITIAL_ORDER)

  const [pledgeText, setPledgeText] = useState('')
  const normalize = (s: string) => s.trim().toLowerCase().replace(/[.,!?]/g, '')
  const textMatchesPledge = normalize(pledgeText) === normalize(REQUIRED_PLEDGE)

  const [gamePhase, setGamePhase] = useState<typeof GAME_PHASES[keyof typeof GAME_PHASES]>(GAME_PHASES.IDLE)
  const userCanClick = gamePhase === GAME_PHASES.SHUFFLED && textMatchesPledge

  function triggerShuffleBurst(count = 8) {
    setGamePhase(GAME_PHASES.SHUFFLING)
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        setOrder(prev => shuffleStep(prev))
        if (i === count - 1) {
          setGamePhase(GAME_PHASES.SHUFFLED)
        }
      }, (i + 1) * 350);
    }
  }

  function handleButtonClick(id: ButtonId) {
    if (id === 'save') {
      if (pledgeText.trim() !== '') {
        completeLevel(LEVELS_IDS.LEVEL_3)
      }
    } else if (id === 'delete') {
      setPledgeText('')
      incrementFriction(LEVELS_IDS.LEVEL_3)
      setGamePhase(GAME_PHASES.INCORRECT_ACTION)
    } else if (id === 'share') {
      incrementFriction(LEVELS_IDS.LEVEL_3)
      setGamePhase(GAME_PHASES.INCORRECT_ACTION)
      // Short pause to show message to user before reshuffling
      setTimeout(() => {
        triggerShuffleBurst()
      }, 1000)
    }
  }

  function handleSetPledgeText(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (gamePhase === GAME_PHASES.IDLE) {
      triggerShuffleBurst()
    }
    setPledgeText(e.target.value)
  }

  return (
    <div className="flex w-full max-w-xl flex-col px-4">
      <div className="rounded border border-teal-800/60 bg-zinc-950/40 overflow-hidden">
        <div className="border-b border-teal-800/60 px-6 py-4">
          <h1 className="text-xl font-bold text-teal-300">Accessibility Pledge</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Write the following commitment to accessible development, then save it:
          </p>
          <p className="italic mt-5 text-sm text-zinc-400">
            &quot;I pledge to always design for all users, keeping in mind accessibility and usability for everyone.&quot;
          </p>
        </div>

        <div className="px-6 py-5">
          <label htmlFor="pledge" className="sr-only">
            Accessibility Pledge
          </label>
          <textarea
            id="pledge"
            value={pledgeText}
            onChange={handleSetPledgeText}
            placeholder="I pledge to always..."
            rows={5}
            className="w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 resize-none"
          />
        </div>

        <div className="border-t border-teal-800/60 px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-zinc-500 transition-all duration-500 mr-5">
            {gamePhase === GAME_PHASES.INCORRECT_ACTION ? 'Not that one... Try again.' : 'Fill the pledge, then click the save button to complete.'}
          </p>

          <div
            className="relative h-12 w-40 shrink-0"
          >
            {BUTTON_DEFINITIONS.map(({ id, Icon }) => {
              const slot = order.indexOf(id)
              return (
                <button
                  key={id}
                  type="button"
                  style={{ left: slot * BUTTON_STRIDE_PX }}
                  onClick={() => handleButtonClick(id)}
                  disabled={!userCanClick}
                  className={clsx(
                    'absolute top-0 size-12 rounded border flex items-center justify-center text-zinc-400',
                    '[transition:left_0.4s_ease-in-out,background-color_0.15s]',
                    'enabled:border-teal-600 enabled:hover:bg-zinc-800 enabled:cursor-pointer',
                    'disabled:border-zinc-700 disabled:bg-zinc-800 disabled:cursor-not-allowed',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={clsx(
                      'transition-opacity duration-0'
                    )}>
                    <Icon />
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {level3Completed && <WinModal />}

      {timeElapsed > 40000 && (
        <GiveUpButton onClick={() => completeLevel(LEVELS_IDS.LEVEL_3)} />
      )}
    </div>
  )
}

// --- Icons ---

function SaveIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  )
}

function DeleteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}

const BUTTON_DEFINITIONS: { id: ButtonId; Icon: () => React.ReactElement }[] = [
  { id: 'save', Icon: SaveIcon },
  { id: 'share', Icon: ShareIcon },
  { id: 'delete', Icon: DeleteIcon },
]
