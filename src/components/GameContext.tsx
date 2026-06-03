import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { GameContextType, GameState, LevelData } from '../types/GameContext'


const initialLevelDate: LevelData = { timeElapsed: 0, frictionEvents: 0 }

const initialGameState: GameState = {
  level1: { ...initialLevelDate },
  level2: { ...initialLevelDate },
  level3: { ...initialLevelDate },
};

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(initialGameState)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [activeLevel, setActiveLevel] = useState<keyof GameState | null>()

  const startGlobalTimer = useCallback((level: keyof GameState) => {
    setIsTimerActive(true)
    setActiveLevel(level)
  }, [])

  const stopGlobalTimer = useCallback(() => {
    setIsTimerActive(false);
  }, []);

  const resetGame = useCallback(() => {
    setState(initialGameState);
    setIsTimerActive(false);
    setActiveLevel(null);
  }, []);

  const incrementFriction = useCallback((level: keyof GameState) => {
    setState((prev) => {

      return {
        ...prev,
        [level]: {
          ...prev[level],
          frictionEvents: prev[level].frictionEvents + 1,
        },
      };
    })
  }, []);

  useEffect(() => {
    if (!isTimerActive || !activeLevel) return;

    const interval = setInterval(() => {
      setState((prev) => ({
        ...prev,
        [activeLevel]: {
          ...prev[activeLevel],
          timeElapsed: prev[activeLevel].timeElapsed + 100
        }
      }));
    }, 100);

    return () => clearInterval(interval);
  });

  return (
    <GameContext.Provider
      value={{
        state,
        isTimerActive,
        incrementFriction,
        startGlobalTimer: () => activeLevel && startGlobalTimer(activeLevel),
        stopGlobalTimer,
        resetGame
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}