import { createFileRoute } from '@tanstack/react-router'
import Level2OtpVerification from '#/components/levels/2/Level2OtpVerification'

export const Route = createFileRoute('/levels/2')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Level2OtpVerification />
}
