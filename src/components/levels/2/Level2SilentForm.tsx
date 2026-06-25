import { useState } from 'react'
import { useGame } from '#/context/game/useGame'
import { LEVEL_TIME_LIMIT, LEVELS_IDS } from '#/lib/constants/levels'
import { isValidPassword } from '#/lib/validators/level2'
import WinModal from '#/components/WinModal'
import GiveUpButton from '#/components/GiveUpButton'

type FormFields = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const emptyForm: FormFields = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function isFormValid(fields: FormFields): boolean {
  return (
    fields.firstName.trim() !== '' &&
    fields.lastName.trim() !== '' &&
    fields.email.trim() !== '' &&
    isValidPassword(fields.password) &&
    fields.confirmPassword === fields.password
  )
}

export default function Level2SilentWall() {
  const { incrementFriction, completeLevel } = useGame()
  const level2Completed = useGame().state.level2.completed
  const [fields, setFields] = useState<FormFields>(emptyForm)
  const [submitted, setSubmitted] = useState(false)
  const timeElapsed = useGame().state.level2.timeElapsed

  const valid = isFormValid(fields)

  const errors = submitted
    ? {
      firstName: fields.firstName.trim() === '',
      lastName: fields.lastName.trim() === '',
      email: fields.email.trim() === '',
      password: !isValidPassword(fields.password),
      confirmPassword: fields.confirmPassword !== fields.password,
    }
    : null

  const hasAnError = errors && Object.values(errors).some(Boolean)

  function handleChange(field: keyof FormFields, value: string) {
    setFields((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (valid) {
      completeLevel(LEVELS_IDS.LEVEL_2)
    } else {
      incrementFriction(LEVELS_IDS.LEVEL_2)
      setSubmitted(true)
    }
  }

  return (
    <div className="flex w-full max-w-xl flex-col px-4">
      <div className="rounded border border-teal-800/60 bg-zinc-950/40 overflow-hidden">
        <div className="border-b border-teal-800/60 px-6 py-4">
          <h1 className="text-xl font-bold text-teal-300">Create Account</h1>
          <p className="mt-1 text-sm text-zinc-400">Fill in your details to get started. Easy enough, right?</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="px-6 py-5 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="First name"
                value={fields.firstName}
                onChange={(v) => handleChange('firstName', v)}
                isError={errors?.firstName}
              />
              <FormField
                label="Last name"
                value={fields.lastName}
                onChange={(v) => handleChange('lastName', v)}
                isError={errors?.lastName}
              />
            </div>

            <FormField
              label="Email"
              value={fields.email}
              onChange={(v) => handleChange('email', v)}
              isError={errors?.email}
            />

            <FormField
              label="Password"
              type="password"
              value={fields.password}
              isError={errors?.password}
              onChange={(v) => handleChange('password', v)}
            />

            <FormField
              label="Confirm password"
              type="password"
              value={fields.confirmPassword}
              onChange={(v) => handleChange('confirmPassword', v)}
              isError={errors?.confirmPassword}
            />
            {hasAnError && (
              <p className="text-red-500 text-sm">
                An error has occured. Please check the fields and try again.
              </p>
            )}
          </div>

          <div className="border-t border-teal-800/60 px-6 py-4 flex justify-end">
            <button
              type="submit"
              className="rounded px-6 py-2 text-sm font-medium border border-teal-700 text-teal-300 hover:bg-teal-900/40 cursor-pointer transition-colors"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>

      {level2Completed && <WinModal />}
      <div className="mt-6 h-10 flex items-center justify-center">
        {timeElapsed > LEVEL_TIME_LIMIT && <GiveUpButton onClick={() => completeLevel(LEVELS_IDS.LEVEL_2)} />}
      </div>

    </div>
  )
}

type FormFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  isError?: boolean
}

function FormField({ label, value, onChange, type = 'text', isError }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-zinc-400">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={[
          'rounded border bg-zinc-900 px-3 py-2 text-sm text-zinc-200 outline-none focus:ring-1 transition-colors',
          isError ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-zinc-700 focus:border-teal-600 focus:ring-teal-600',
        ].join(' ')}
      />
    </div>
  )
}
