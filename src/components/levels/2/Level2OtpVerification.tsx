import { useState } from 'react'
import clsx from 'clsx'
import { useGame } from '#/context/game/useGame'
import { LEVEL_TIME_LIMIT, LEVELS_IDS } from '#/lib/constants/levels'
import { useOtpChallenge } from '#/hooks/useOtpChallenge'
import WinModal from '#/components/WinModal'
import GiveUpButton from '#/components/GiveUpButton'
import OtpCodeToast from '#/components/levels/2/OtpCodeToast'

function formatCountdown(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `0:${secs.toString().padStart(2, '0')}`
}

export default function Level2OtpVerification() {
  const { incrementFriction, completeLevel } = useGame()
  const level2Completed = useGame().state.level2.completed
  const timeElapsed = useGame().state.level2.timeElapsed

  const [input, setInput] = useState('')
  const [error, setError] = useState<string | null>(null)

  const {
    code,
    secondsRemaining,
    expired,
    toastVisible,
    started,
    resend,
  } = useOtpChallenge({
    active: !level2Completed,
  })

  function handleResend() {
    incrementFriction(LEVELS_IDS.LEVEL_2)
    setInput('')
    setError(null)
    resend()
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (expired || secondsRemaining === 0) return

    if (input.toUpperCase() === code.toUpperCase()) {
      completeLevel(LEVELS_IDS.LEVEL_2)
    } else {
      setError('Invalid code.')
    }
  }

  const statusMessage = expired
    ? 'Code expired.'
    : 'Enter the code we just sent.'

  return (
    <div className="relative flex w-full min-h-[60vh] flex-col items-center justify-center px-4">
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded border border-teal-800/60 bg-zinc-950/40 overflow-hidden">
          <div className="border-b border-teal-800/60 px-6 py-4">
            <h1 className="text-xl font-bold text-teal-300">Verify with a one-time code</h1>
            <p className="mt-1 text-sm text-zinc-400">{statusMessage}</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="px-6 py-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="otp-code" className="text-sm text-zinc-400">
                  Verification code
                </label>
                <input
                  id="otp-code"
                  type="text"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value)
                    setError(null)
                  }}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  disabled={expired}
                  className={clsx(
                    'rounded border bg-zinc-900 px-3 py-2 font-mono text-sm text-zinc-200 outline-none focus:ring-1 transition-colors',
                    error
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-zinc-700 focus:border-teal-600 focus:ring-teal-600',
                    expired && 'opacity-60 cursor-not-allowed',
                  )}
                />
                {error && (
                  <p className="text-sm text-red-500" role="alert">
                    {error}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between gap-4">
                {started && (
                  <p
                    className={clsx(
                      'text-sm tabular-nums',
                      secondsRemaining <= 3 && !expired
                        ? 'text-red-400'
                        : 'text-zinc-500',
                    )}
                  >
                    {expired ? 'Expired' : `${formatCountdown(secondsRemaining)} remaining`}
                  </p>
                )}
                <button
                  type="button"
                  onClick={handleResend}
                  className="ml-auto text-sm text-teal-500 hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Resend code
                </button>
              </div>
            </div>

            <div className="border-t border-teal-800/60 px-6 py-4 flex justify-end">
              <button
                type="submit"
                disabled={expired || !input.trim()}
                className={clsx(
                  'rounded px-6 py-2 text-sm font-medium border transition-colors',
                  expired || !input.trim()
                    ? 'border-zinc-700 text-zinc-500 cursor-not-allowed'
                    : 'border-teal-700 text-teal-300 hover:bg-teal-900/40 cursor-pointer',
                )}
              >
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>

      {!level2Completed && toastVisible && (
        <OtpCodeToast code={code} />
      )}

      {level2Completed && <WinModal />}

      <div className="relative z-10 mt-6 h-10 flex items-center justify-center">
        {timeElapsed > LEVEL_TIME_LIMIT && (
          <GiveUpButton onClick={() => completeLevel(LEVELS_IDS.LEVEL_2)} />
        )}
      </div>
    </div>
  )
}
