export default function LanguageSelect({ className }: { className?: string }) {
  return (
    <select aria-label="Select Language" className={className}>
      <option>English 🇬🇧</option>
      <option>French 🇫🇷</option>
    </select>
  )
}