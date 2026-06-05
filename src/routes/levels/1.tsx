import { createFileRoute } from '@tanstack/react-router'
import Level1Parkinson from '#/components/levels/1/Level1Parkinson'

export const Route = createFileRoute('/levels/1')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Level1Parkinson />
}
