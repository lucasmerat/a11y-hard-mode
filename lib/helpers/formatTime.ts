export const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // TODO: Localize this for m/s
  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
}
