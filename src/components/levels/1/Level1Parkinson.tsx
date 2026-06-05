import { useCallback, useRef, useState } from 'react'
import { useGame } from '#/components/GameContext'
import ParkinsonCursor from '#/components/levels/1/ParkinsonCursor'
import { useLevel1ClickHandling } from '#/hooks/useLevel1ClickHandling'
import { useParkinsonVisualPointer } from '#/hooks/useParkinsonVisualPointer'
import { level1TermsParagraphs } from '#/lib/constants/level1Terms'
import { LEVELS_IDS } from '#/lib/constants/levels'

export default function Level1Parkinson() {
  const { incrementFriction, completeLevel } = useGame()
  const [agreed, setAgreed] = useState(false)

  const checkboxRef = useRef<HTMLInputElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { visualPointer, visualPointerRef } = useParkinsonVisualPointer()

  const onCheckboxHit = useCallback(() => {
    setAgreed(true)
    completeLevel(LEVELS_IDS.LEVEL_1)
  }, [completeLevel])

  const onMisclick = useCallback(() => {
    incrementFriction(LEVELS_IDS.LEVEL_1)
  }, [incrementFriction])

  useLevel1ClickHandling({
    active: !agreed,
    visualPointerRef,
    checkboxRef,
    scrollAreaRef,
    onCheckboxHit,
    onMisclick,
  })

  return (
    <>
      <ParkinsonCursor x={visualPointer.x} y={visualPointer.y} />

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
              checked={agreed}
              readOnly
              tabIndex={-1}
              className="size-[9px] shrink-0 appearance-none rounded-[2px] border border-teal-500 bg-zinc-950 checked:border-teal-300 checked:bg-teal-500 focus:outline-none disabled:opacity-60"
              aria-label="I agree to the terms and conditions"
            />
            {/* Intentionally not a <label> — clicking text does not toggle the box. */}
            <span className="select-none text-sm text-teal-300/90">
              I agree to the terms and conditions
            </span>
          </div>
        </div>

        {agreed && (
          <p className="mt-4 text-center text-sm text-teal-400" role="status">
            You made it.
          </p>
        )}
      </div>
    </>
  )
}
