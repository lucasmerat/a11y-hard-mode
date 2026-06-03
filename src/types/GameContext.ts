export type LevelData = {
  timeElapsed: number;
  frictionEvents: number;
}

export type GameState = {
  level1: LevelData;
  level2: LevelData;
  level3: LevelData;
}

export type GameContextType = {
  state: GameState;
  isTimerActive: boolean;
  incrementFriction: (level: keyof GameState) => void;
  startGlobalTimer: (level: keyof GameState) => void;
  stopGlobalTimer: () => void;
  resetGame: () => void;
}