
type GiveUpButtonProps = {
  onClick: () => void
  ref?: React.Ref<HTMLButtonElement>
}

const GiveUpButton = ({ onClick, ref }: GiveUpButtonProps) => (
  <button
    ref={ref}
    type="button"
    onClick={onClick}
    className="border cursor-pointer border-teal-700 bg-zinc-950/40 rounded-md px-4 py-2 pointer-events-auto mx-auto mt-6 flex items-center gap-2 text-m text-zinc-200 transition-colors animate-fade-in"
  >
    🏳️ I give up
  </button>
)

export default GiveUpButton
