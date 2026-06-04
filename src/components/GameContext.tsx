import { useMatches } from '@tanstack/react-router';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { GameContextType, GameState, LevelData } from '#/types/GameContext'


const initialLevelDate: LevelData = { timeElapsed: 0, frictionEvents: 0 }

const initialGameState: GameState = {
  level1: { ...initialLevelDate },
  level2: { ...initialLevelDate },
  level3: { ...initialLevelDate },
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
    if (!activeLevel) return;

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
  }, [activeLevel]);

  return (
    <GameContext.Provider
      value={{
        activeLevel,
        state,
        incrementFriction,
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