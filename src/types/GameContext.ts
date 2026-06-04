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
  activeLevel: keyof GameState | null | undefined;
  state: GameState;
  isTimerActive: boolean;
  incrementFriction: (level: keyof GameState) => void;
  resetGame: () => void;
}