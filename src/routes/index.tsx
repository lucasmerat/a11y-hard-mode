import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Landing })

function Landing() {
  return (
    <main className="flex flex-col justify-center items-center flex-grow page-wrap px-4 pb-8 pt-14">
      <h1 className="display-title mb-10 text-4xl font-bold sm:text-5xl">
        a11y hard mode
      </h1>
      <p className="mb-10 w-[85%] text-lg text-center">This is what the web feels like when it’s not built for you. Three levels. Three barriers. Can you reach the end?</p>
      <Link to="/levels/1" className="text-sm px-6 py-3 border border-teal-700 bg-transparent text-teal-300 rounded hover:bg-teal-200 hover:text-zinc-950 hover:border-zinc-950 transition-all duration-300 ease-in-out">Start the gauntlet <span className="inline-block">→</span></Link>
    </main>
  )
}
