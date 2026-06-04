import { useMatches } from '@tanstack/react-router';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { GameContextType, GameState, LevelData } from '#/types/GameContext'


const initialLevelData: LevelData = {
  timeElapsed: 0,
  frictionEvents: 0,
  completed: false,
}

const initialGameState: GameState = {
  level1: { ...initialLevelData },
  level2: { ...initialLevelData },
  level3: { ...initialLevelData },
};

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(initialGameState)

  const matches = useMatches()

  const activeLevel = useMemo(() => {
    const currentRouteId = matches[matches.length - 1]?.routeId

    if (currentRouteId === '/levels/1') return 'level1'
    if (currentRouteId === '/levels/2') return 'level2'
    if (currentRouteId === '/levels/3') return 'level3'
    return null
  }, [matches])

  const resetGame = useCallback(() => {
    setState(initialGameState);
  }, []);

  const incrementFriction = useCallback((level: keyof GameState) => {
    setState((prev) => ({
      ...prev,
      [level]: {
        ...prev[level],
        frictionEvents: prev[level].frictionEvents + 1,
      },
    }))
  }, []);

  const completeLevel = useCallback((level: keyof GameState) => {
    setState((prev) => ({
      ...prev,
      [level]: {
        ...prev[level],
        completed: true,
      },
    }))
  }, []);

  const activeLevelCompleted =
    activeLevel != null ? state[activeLevel].completed : false

  useEffect(() => {
    if (!activeLevel || activeLevelCompleted) return

    const interval = setInterval(() => {
      setState((prev) => {
        if (prev[activeLevel].completed) return prev
        return {
          ...prev,
          [activeLevel]: {
            ...prev[activeLevel],
            timeElapsed: prev[activeLevel].timeElapsed + 100,
          },
        }
      })
    }, 100)

    return () => clearInterval(interval)
  }, [activeLevel, activeLevelCompleted]);

  return (
    <GameContext.Provider
      value={{
        activeLevel,
        state,
        incrementFriction,
        completeLevel,
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