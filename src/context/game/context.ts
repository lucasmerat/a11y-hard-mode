import type { GameContextType } from "#/types/GameContext";
import { createContext } from "react";


export const GameContext = createContext<GameContextType | undefined>(undefined)
