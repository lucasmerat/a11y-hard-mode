type OtpCodeToastProps = {
  code: string
}

export default function OtpCodeToast({ code }: OtpCodeToastProps) {
  return (
    <div
      role="status"
      className="pointer-events-none absolute bottom-0 right-10 z-30 w-72 animate-fade-in motion-reduce:animate-none"
    >
      <div className="rounded border border-zinc-700 bg-zinc-900 px-4 py-3 shadow-lg">
        <p className="text-sm text-zinc-200">Your verification code</p>
        <p className="mt-1 font-mono text-lg tracking-widest text-teal-300">{code}</p>
      </div>
    </div>
  )
}
