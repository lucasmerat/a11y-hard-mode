import { useEffect, type RefObject } from 'react'
import { isPointInsideElement, type Point } from '#/lib/parkinsonPointer'

const USE_EVENT_CAPTURE = true

type UseLevel1ClickHandlingOptions = {
  active: boolean
  visualPointerRef: RefObject<Point>
  checkboxRef: RefObject<HTMLInputElement | null>
  quitButtonRef: RefObject<HTMLButtonElement | null>
  scrollAreaRef: RefObject<HTMLDivElement | null>
  onWinLevel1: () => void
  onMisclick: () => void
}

function isRealPointerOverScrollArea(
  event: Event,
  scrollArea: HTMLDivElement | null,
) {
  if (!scrollArea || !(event instanceof PointerEvent)) return false
  return isPointInsideElement(
    event.clientX,
    event.clientY,
    scrollArea,
  )
}

export function useLevel1ClickHandling({
  active,
  visualPointerRef,
  checkboxRef,
  quitButtonRef,
  scrollAreaRef,
  onWinLevel1,
  onMisclick,
}: UseLevel1ClickHandlingOptions) {
  useEffect(() => {
    if (!active) return

    const blockNativePointer = (event: Event) => {
      if (isRealPointerOverScrollArea(event, scrollAreaRef.current)) return
      event.preventDefault()
    }

    const handleClick = (event: MouseEvent) => {
      event.preventDefault()
      event.stopPropagation()

      const { x, y } = visualPointerRef.current
      const checkbox = checkboxRef.current
      if (checkbox && isPointInsideElement(x, y, checkbox)) {
        onWinLevel1()
        return
      }

      const quitButtonClicked = quitButtonRef.current && event.target === quitButtonRef.current

      if (quitButtonClicked) {
        onWinLevel1()
        return
      }

      onMisclick()
    }

    document.addEventListener('pointerdown', blockNativePointer, USE_EVENT_CAPTURE)
    document.addEventListener('click', blockNativePointer, USE_EVENT_CAPTURE)
    document.addEventListener('click', handleClick, USE_EVENT_CAPTURE)

    return () => {
      document.removeEventListener('pointerdown', blockNativePointer, USE_EVENT_CAPTURE)
      document.removeEventListener('click', blockNativePointer, USE_EVENT_CAPTURE)
      document.removeEventListener('click', handleClick, USE_EVENT_CAPTURE)
    }
  }, [
    active,
    visualPointerRef,
    checkboxRef,
    quitButtonRef,
    scrollAreaRef,
    onWinLevel1,
    onMisclick,
  ])
}
