export type LevelData = {
  timeElapsed: number;
  frictionEvents: number;
  completed: boolean;
}

export type GameState = {
  level1: LevelData;
  level2: LevelData;
  level3: LevelData;
}

export type GameContextType = {
  activeLevel: keyof GameState | null | undefined;
  state: GameState;
  incrementFriction: (level: keyof GameState) => void;
  completeLevel: (level: keyof GameState) => void;
  resetGame: () => void;
}