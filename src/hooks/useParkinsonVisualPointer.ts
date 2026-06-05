import { useCallback, useEffect, useRef, useState } from 'react'
import {
  clampOffset,
  PARKINSON_MAX_OFFSET,
  PARKINSON_MOVE_IMPULSE,
  PARKINSON_RESTING_DRIFT,
  randomTremorStep,
  type Point,
} from '#/lib/parkinsonPointer'

/**
 * Tracks two positions:
 * - real pointer (from the OS)
 * - visual cursor (real + tremor) — used to draw the arrow and to score clicks
 */
export function useParkinsonVisualPointer({ enabled }: { enabled: boolean }) {
  const realPointerRef = useRef<Point>({ x: 0, y: 0 })
  const tremorOffsetRef = useRef<Point>({ x: 0, y: 0 })
  /** Same as `visual` state; ref so click handlers always read the latest coords. */
  const visualPointerRef = useRef<Point>({ x: 0, y: 0 })
  const [visualPointer, setVisualPointer] = useState<Point>({ x: 0, y: 0 })

  const syncVisualPointer = useCallback(() => {
    const next = {
      x: realPointerRef.current.x + tremorOffsetRef.current.x,
      y: realPointerRef.current.y + tremorOffsetRef.current.y,
    }
    visualPointerRef.current = next
    setVisualPointer(next)
  }, [])

  const applyTremor = useCallback(
    (impulse: number) => {
      const step = randomTremorStep(impulse)
      tremorOffsetRef.current.x += step.x
      tremorOffsetRef.current.y += step.y
      clampOffset(tremorOffsetRef.current, PARKINSON_MAX_OFFSET)
      syncVisualPointer()
    },
    [syncVisualPointer],
  )

  useEffect(() => {
    if (!enabled) return

    document.body.classList.add('cursor-none')

    const onRealPointerMove = (event: PointerEvent) => {
      realPointerRef.current = { x: event.clientX, y: event.clientY }
      applyTremor(PARKINSON_MOVE_IMPULSE)
    }

    let animationFrameId = 0
    const onAnimationFrame = () => {
      applyTremor(PARKINSON_RESTING_DRIFT)
      animationFrameId = requestAnimationFrame(onAnimationFrame)
    }
    animationFrameId = requestAnimationFrame(onAnimationFrame)

    window.addEventListener('pointermove', onRealPointerMove, { passive: true })

    return () => {
      document.body.classList.remove('cursor-none')
      window.removeEventListener('pointermove', onRealPointerMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [applyTremor, enabled])

  return { visualPointer, visualPointerRef }
}
