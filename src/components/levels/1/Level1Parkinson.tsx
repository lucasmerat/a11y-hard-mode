import { useCallback, useRef } from 'react'
import { useGame } from '#/components/GameContext'
import ParkinsonCursor from '#/components/levels/1/ParkinsonCursor'
import { useLevel1ClickHandling } from '#/hooks/useLevel1ClickHandling'
import { useParkinsonVisualPointer } from '#/hooks/useParkinsonVisualPointer'
import { level1TermsParagraphs } from '#/lib/constants/level1Terms'
import { LEVELS_IDS } from '#/lib/constants/levels'
import WinModal from '#/components/WinModal'

export default function Level1Parkinson() {
  const { incrementFriction, completeLevel } = useGame()
  const level1Completed = useGame().state.level1.completed

  const checkboxRef = useRef<HTMLInputElement>(null)
  const quitButtonRef = useRef<HTMLButtonElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { visualPointer, visualPointerRef } = useParkinsonVisualPointer({ enabled: !level1Completed })

  const onWinLevel1 = useCallback(() => {
    completeLevel(LEVELS_IDS.LEVEL_1)
  }, [completeLevel])

  const onMisclick = useCallback(() => {
    incrementFriction(LEVELS_IDS.LEVEL_1)
  }, [incrementFriction])

  useLevel1ClickHandling({
    active: !level1Completed,
    visualPointerRef,
    checkboxRef,
    quitButtonRef,
    scrollAreaRef,
    onWinLevel1,
    onMisclick,
  })

  return (
    <>
      {!level1Completed && <ParkinsonCursor x={visualPointer.x} y={visualPointer.y} />}

      <div className="pointer-events-none flex w-full max-w-2xl flex-col px-4">
        <div className="flex max-h-[70vh] flex-col overflow-hidden rounded border border-teal-800/60 bg-zinc-950/40">
          <h1 className="border-b border-teal-800/60 px-6 py-4 text-xl font-bold text-teal-300">
            Terms of Service
          </h1>

          <div
            ref={scrollAreaRef}
            className="pointer-events-auto flex-1 overflow-y-auto px-6 py-4 prose prose-invert prose-sm max-w-none"
          >
            {level1TermsParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          <div className="flex items-center gap-3 border-t border-teal-800/60 px-6 py-4">
            <input
              ref={checkboxRef}
              type="checkbox"
              tabIndex={-1}
              checked={level1Completed}
              readOnly
              className="pointer-events-auto size-[9px] shrink-0 appearance-none rounded-[2px] border border-teal-500 bg-zinc-950 checked:border-teal-300 checked:bg-teal-500 focus:outline-none disabled:opacity-60"
              aria-label="I agree to the terms and conditions"
            />
            {/* Intentionally not a <label> — clicking text does not toggle the box. */}
            <span className="select-none text-sm text-teal-300/90">
              I agree to the terms and conditions
            </span>
          </div>
        </div>

        {level1Completed && <WinModal />}

        <button ref={quitButtonRef} className="pointer-events-auto" onClick={() => completeLevel(LEVELS_IDS.LEVEL_1)}>Complete Level</button>
      </div>
    </>
  )
}
