import { formatTime } from "#/lib/helpers/formatTime";
import { useGame } from "./GameContext";
import { LEVEL_TITLES, FRICTION_EVENT_TITLES } from "#/lib/constants/copy";

export default function GameHud() {
  const gameContext = useGame();

  const activeLevel = gameContext.activeLevel;

  const frictionEvents = activeLevel ? gameContext.state[activeLevel].frictionEvents : 0;

  if (!activeLevel) return null

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">{LEVEL_TITLES[activeLevel]}</h1>
      <p>Time spent on level: {formatTime(gameContext.state[activeLevel].timeElapsed)}</p>
      <p key={frictionEvents} className={frictionEvents > 0 ? 'animate-tremor-once' : undefined}>{FRICTION_EVENT_TITLES[activeLevel]}: {gameContext.state[activeLevel].frictionEvents}</p>
    </div>
  )
}