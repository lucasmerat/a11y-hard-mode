import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/levels/1')({
  component: RouteComponent,
  loader: () => {
    console.log('This is loading on the client and the server')
    return {
      message: 'Hello "/levels/1"!'
    }
  }
})

function RouteComponent() {
  const { message } = Route.useLoaderData()

  return <div className="flex flex-col"><span>{message}</span><Link to="/levels/2">Go to level 2</Link></div>
}
