import { createFileRoute, Outlet } from '@tanstack/react-router'
import GameHud from '#/components/GameHud'

export const Route = createFileRoute('/levels')({
  component: () => (
    <>
      <GameHud />
      <Outlet />
    </>
  ),
})