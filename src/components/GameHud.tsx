import { formatTime } from "#/lib/helpers/formatTime";
import { useGame } from "./GameContext";
import { LEVEL_TITLES, FRICTION_EVENT_TITLES } from "#/lib/constants/copy";
import { useEffect, useState } from "react";

export default function GameHud() {
  const gameContext = useGame();

  const activeLevel = gameContext.activeLevel;

  const [misclickShake, setMisclickShake] = useState(false);
  const frictionEvents = activeLevel ? gameContext.state[activeLevel].frictionEvents : 0;

  useEffect(() => {
    if (frictionEvents > 0) {
      setMisclickShake(true)
    }
  }, [frictionEvents, activeLevel])

  if (!activeLevel) return null

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">{LEVEL_TITLES[activeLevel]}</h1>
      <p>Time spent on level: {formatTime(gameContext.state[activeLevel].timeElapsed)}</p>
      <p onAnimationEnd={() => setMisclickShake(false)} className={misclickShake ? 'animate-tremor-once' : undefined}>{FRICTION_EVENT_TITLES[activeLevel]}: {gameContext.state[activeLevel].frictionEvents}</p>
    </div>
  )
}