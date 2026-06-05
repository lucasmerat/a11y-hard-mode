import { createFileRoute, Link } from '@tanstack/react-router'
import { getCompletionCount } from '#/lib/appwrite'

export const Route = createFileRoute('/')({
  loader: async () => {
    try {
      const completionCount = await getCompletionCount()
      return { completionCount }
    } catch {
      // Non-fatal — display nothing if the count can't be fetched
      return { completionCount: null }
    }
  },
  component: Landing,
})

function Landing() {
  const { completionCount } = Route.useLoaderData()

  const completionLabel =
    completionCount !== null && completionCount > 0
      ? `${completionCount.toLocaleString()} ${completionCount === 1 ? 'person has' : 'people have'} beaten this`
      : null

  return (
    <>
      <h1 className="display-title mb-10 text-4xl font-bold sm:text-5xl">
        a11y hard mode
      </h1>
      <p className="mb-10 max-w-[44rem] text-lg text-center">
        This is what the web feels like when it's not built for you. Three levels. Three barriers. Can you reach the end?
      </p>
      {completionLabel && (
        <p className="mb-6 text-sm text-zinc-400">{completionLabel}</p>
      )}
      <Link
        to="/levels/1"
        className="hover:animate-tremor text-sm px-6 py-3 border border-teal-700 bg-transparent text-teal-300 rounded hover:bg-teal-200 hover:text-zinc-950 hover:border-zinc-950 transition-all duration-300 ease-in-out"
      >
        Start the gauntlet <span className="inline-block">→</span>
      </Link>
    </>
  )
}
