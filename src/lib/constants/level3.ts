export type ButtonId = 'save' | 'share' | 'delete'

export const INITIAL_ORDER: ButtonId[] = ['save', 'share', 'delete']

export const GAME_PHASES = {
  IDLE: 'idle',
  SHUFFLING: 'shuffling',
  SHUFFLED: 'shuffled',
  INCORRECT_ACTION: 'incorrect_action',
} as const;