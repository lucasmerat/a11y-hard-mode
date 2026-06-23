import { createFileRoute } from '@tanstack/react-router'
import Level2SilentWall from '#/components/levels/2/Level2SilentWall'

export const Route = createFileRoute('/levels/2')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Level2SilentWall />
}
