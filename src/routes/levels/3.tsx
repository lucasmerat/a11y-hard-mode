import { createFileRoute } from '@tanstack/react-router'
import Level3AnonymousActions from '#/components/levels/3/Level3AnonymousActions'

export const Route = createFileRoute('/levels/3')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Level3AnonymousActions />
}
