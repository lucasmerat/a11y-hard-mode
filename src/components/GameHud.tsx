import { formatTime } from "../../lib/helpers/formatTime";
import { useGame } from "./GameContext";
import { levelCopy, frictionEventCopy } from "../../lib/constants/copy.ts";

export default function GameHud() {
  const gameContext = useGame();

  const activeLevel = gameContext.activeLevel;

  if (!activeLevel) return null

  return (
    <div className="absolute left-4 top-4 flex flex-col">
      <p>Time spent on {levelCopy[activeLevel]}: {formatTime(gameContext.state[activeLevel].timeElapsed)}</p>
      <p>{frictionEventCopy[activeLevel]}: {gameContext.state[activeLevel].frictionEvents}</p>
    </div>
  )
}