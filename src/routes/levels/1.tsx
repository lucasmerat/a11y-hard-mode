import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/levels/1')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="flex flex-col"><span>Hello "/levels/1"!</span><Link to="/levels/2">Go to level 2</Link></div>
}
