import { useCallback, useEffect, useRef, useState } from 'react'
import {
  CALM_BEAT_MS,
  ENTRY_TIMEOUT_MS,
  TOAST_VISIBLE_MS,
} from '#/lib/constants/level2'
import { generateOtpCode } from '#/lib/otpCode'

type UseOtpChallengeOptions = {
  active: boolean
}

export function useOtpChallenge({ active }: UseOtpChallengeOptions) {
  const [code, setCode] = useState(() => generateOtpCode())
  const [secondsRemaining, setSecondsRemaining] = useState(0)
  const [expired, setExpired] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [started, setStarted] = useState(false)

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearEntryTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const clearToastTimer = useCallback(() => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current)
      toastTimerRef.current = null
    }
  }, [])

  const showToast = useCallback(() => {
    clearToastTimer()
    setToastVisible(true)
    toastTimerRef.current = setTimeout(() => {
      setToastVisible(false)
    }, TOAST_VISIBLE_MS)
  }, [clearToastTimer])

  const startEntryTimer = useCallback(() => {
    clearEntryTimer()
    setExpired(false)
    setSecondsRemaining(Math.ceil(ENTRY_TIMEOUT_MS / 1000))

    timerRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearEntryTimer()
          setExpired(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [clearEntryTimer])

  const beginChallenge = useCallback(() => {
    setStarted(true)
    showToast()
    startEntryTimer()
  }, [showToast, startEntryTimer])

  const resend = useCallback(() => {
    setCode(generateOtpCode())
    showToast()
    startEntryTimer()
  }, [showToast, startEntryTimer])

  useEffect(() => {
    if (!active || started) return

    const calmTimer = setTimeout(beginChallenge, CALM_BEAT_MS)
    return () => clearTimeout(calmTimer)
  }, [active, started, beginChallenge])

  useEffect(() => {
    return () => {
      clearEntryTimer()
      clearToastTimer()
    }
  }, [clearEntryTimer, clearToastTimer])

  return {
    code,
    secondsRemaining,
    expired,
    toastVisible,
    started,
    resend,
  }
}
