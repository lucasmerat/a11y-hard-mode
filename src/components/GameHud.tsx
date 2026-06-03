import { useEffect } from "react";
import { useGame } from "./GameContext";

export default function GameHud() {
  const gameContext = useGame();

  useEffect(() => {
    gameContext.startGlobalTimer('level1')
  }, [gameContext.state]);

  return (
    <div className="absolute left-4 top-4">{gameContext.state.level1.timeElapsed}</div>
  )
}