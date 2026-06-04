const CURSOR_SIZE_PX = 20

type ParkinsonCursorProps = {
  x: number
  y: number
}

/** Draws the fake cursor. Does not handle clicks — see useLevel1ClickHandling. */
export default function ParkinsonCursor({ x, y }: ParkinsonCursorProps) {
  return (
    <div
      className="pointer-events-none fixed z-[100] animate-tremor"
      style={{
        left: x,
        top: y,
        width: CURSOR_SIZE_PX,
        height: CURSOR_SIZE_PX,
        marginLeft: -CURSOR_SIZE_PX / 2,
        marginTop: -CURSOR_SIZE_PX / 2,
      }}
      aria-hidden
    >
      <svg
        width={CURSOR_SIZE_PX}
        height={CURSOR_SIZE_PX}
        viewBox="0 0 24 24"
        className="drop-shadow-md"
      >
        <path
          d="M5 3l14 9-6 1 4 8-3 1-4-8-5-1z"
          fill="currentColor"
          className="text-teal-400"
        />
      </svg>
    </div>
  )
}
