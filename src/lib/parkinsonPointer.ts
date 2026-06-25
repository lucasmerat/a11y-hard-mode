export type Point = { x: number; y: number }

/** Fake cursor is within this many pixels of real cursor */
export const PARKINSON_MAX_OFFSET = 22
/** Shake strength when the mouse moves. */
export const PARKINSON_MOVE_IMPULSE = 12
/** Shake strength when not moving mouse. */
export const PARKINSON_RESTING_DRIFT = 8

export function randomTremorStep(impulse: number): Point {
  return {
    x: (Math.random() - 0.5) * impulse,
    y: (Math.random() - 0.5) * impulse,
  }
}

/** Cap the offset of fake cursor to prevent it from wandering too far */
export function clampOffset(offset: Point, max: number) {
  offset.x = Math.min(max, Math.max(-max, offset.x))
  offset.y = Math.min(max, Math.max(-max, offset.y))
}

export function isPointInsideElement(
  x: number,
  y: number,
  element: HTMLElement,
) {
  const rect = element.getBoundingClientRect()
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
}
