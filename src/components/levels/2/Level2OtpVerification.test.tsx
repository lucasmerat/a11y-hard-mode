import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Level2OtpVerification from './Level2OtpVerification'
import GameHud from '#/components/GameHud'
import { GameProvider } from '#/context/game/GameProvider'
import { useMatches } from '@tanstack/react-router'

vi.mock('@tanstack/react-router', () => ({
  useMatches: vi.fn(),
  Link: ({
    children,
    to,
  }: {
    children: React.ReactNode
    to: string
  }) => <a href={to}>{children}</a>,
}))

vi.mock('#/hooks/useOtpChallenge', () => ({
  useOtpChallenge: () => ({
    code: 'ab12cd34',
    secondsRemaining: 12,
    expired: false,
    toastVisible: false,
    started: true,
    resend: vi.fn(),
  }),
}))

describe('Level2OtpVerification', () => {
  beforeEach(() => {
    vi.mocked(useMatches).mockReturnValue([{ routeId: '/levels/2' } as ReturnType<typeof useMatches>[0]])
  })

  function renderLevel() {
    return render(
      <GameProvider>
        <GameHud />
        <Level2OtpVerification />
      </GameProvider>,
    )
  }

  it('completes level when the correct code is entered', () => {
    renderLevel()

    fireEvent.change(screen.getByLabelText('Verification code'), {
      target: { value: 'ab12cd34' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Verify' }))

    expect(screen.getByRole('alertdialog')).toBeInTheDocument()
  })

  it('accepts the code regardless of letter casing', () => {
    renderLevel()

    fireEvent.change(screen.getByLabelText('Verification code'), {
      target: { value: 'AB12CD34' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Verify' }))

    expect(screen.getByRole('alertdialog')).toBeInTheDocument()
  })

  it('shows error for wrong code without completing', () => {
    renderLevel()

    fireEvent.change(screen.getByLabelText('Verification code'), {
      target: { value: 'wrong' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Verify' }))

    expect(screen.getByText('Invalid code.')).toBeInTheDocument()
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
  })
})
