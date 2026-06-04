import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/levels/3')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/levels/3"!</div>
}
