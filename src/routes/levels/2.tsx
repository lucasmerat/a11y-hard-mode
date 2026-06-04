import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/levels/2')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="flex flex-col"><span>Hello "/levels/2"!</span><Link to="/levels/3">Go to level 3</Link></div>
}
