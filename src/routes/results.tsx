import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useGame } from '#/context/game/useGame'
import { formatTime } from '#/lib/helpers/formatTime'
import { incrementCompletions } from '#/lib/appwrite'

export const Route = createFileRoute('/results')({
  component: ResultsPage,
})

const WCAG_LINKS = [
  { label: '2.5.8 Target Size', url: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum' },
  { label: '2.2.1 Timing Adjustable', url: 'https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable' },
  { label: '1.1.1 Non-text Content', url: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-content' },
]

function ResultsPage() {
  const { state } = useGame()
  const [copied, setCopied] = useState(false)

  const { level1, level2, level3 } = state
  const totalMs = level1.timeElapsed + level2.timeElapsed + level3.timeElapsed
  const totalFriction = level1.frictionEvents + level2.frictionEvents + level3.frictionEvents
  const allCompleted = level1.completed && level2.completed && level3.completed

  useEffect(() => {
    if (!allCompleted) return
    incrementCompletions().catch(() => { })
  }, [allCompleted])

  async function handleShare() {
    const text = [
      '🏆 I survived a11y hard mode.',
      '',
      `Level 1 — Parkinson's Tremor: ${formatTime(level1.timeElapsed)} · ${level1.frictionEvents} misclick${level1.frictionEvents === 1 ? '' : 's'}`,
      `Level 2 — Flash Code: ${formatTime(level2.timeElapsed)} · ${level2.frictionEvents} code resend${level2.frictionEvents === 1 ? '' : 's'}`,
      `Level 3 — Anonymous Actions: ${formatTime(level3.timeElapsed)} · ${level3.frictionEvents} wrong button${level3.frictionEvents === 1 ? '' : 's'}`,
      `Total: ${formatTime(totalMs)}`,
      '',
      'Think the web is accessible? Experience it yourself →',
      window.location.origin,
    ].join('\n')

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Clipboard API not available
    }
  }

  return (
    <div className="max-w-lg px-4 text-center animate-fade-in">
      <h1 className="display-title mb-6 text-4xl font-bold text-teal-300 sm:text-5xl">
        {allCompleted ? 'You survived.' : 'You made it this far.'}
      </h1>

      <p className="mb-2 text-lg tabular-nums text-zinc-200">
        {formatTime(totalMs)} total
        <span className="text-zinc-600"> · </span>
        {totalFriction} mistake{totalFriction === 1 ? '' : 's'}
      </p>

      <p className="mb-10 text-sm text-zinc-500">
        {formatTime(level1.timeElapsed)} tremor
        <span className="text-zinc-700"> · </span>
        {formatTime(level2.timeElapsed)} flash code
        <span className="text-zinc-700"> · </span>
        {formatTime(level3.timeElapsed)} anonymous actions
      </p>

      <button
        type="button"
        onClick={handleShare}
        className={clsx(
          'mb-10 text-sm px-6 py-3 border rounded transition-all duration-300 ease-in-out cursor-pointer',
          copied
            ? 'border-teal-600 text-teal-300'
            : 'border-teal-700 bg-transparent text-teal-300 hover:bg-teal-200 hover:text-zinc-950 hover:border-zinc-950',
        )}
      >
        {copied ? 'Copied ✓' : 'Share your results →'}
      </button>

      <p className="mb-4 max-w-md mx-auto text-sm text-zinc-400 leading-relaxed">
        You felt three real barriers. WCAG has dozens more — this is just the start.
      </p>

      <p className="mb-10 text-sm text-zinc-500">
        {WCAG_LINKS.map(({ label, url }, i) => (
          <span key={url}>
            {i > 0 && <span className="text-zinc-700"> · </span>}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-500 hover:text-teal-300 transition-colors"
            >
              {label}
            </a>
          </span>
        ))}
        <span className="text-zinc-700"> · </span>
        <a
          href="https://www.w3.org/WAI/WCAG22/quickref/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-500 hover:text-teal-300 transition-colors"
        >
          all of WCAG 2.2 →
        </a>
      </p>

      <Link
        to="/"
        className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
      >
        ← Play again
      </Link>
    </div>
  )
}
