import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/levels/1')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/levels/1"!</div>
}
