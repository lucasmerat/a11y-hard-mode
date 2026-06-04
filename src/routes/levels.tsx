import { createFileRoute, Outlet } from '@tanstack/react-router'
import GameHud from '#/components/GameHud'

export const Route = createFileRoute('/levels')({
  component: () => (
    <main className="flex flex-col justify-center items-center flex-grow">
      <GameHud />
      <Outlet />
    </main>
  ),
})