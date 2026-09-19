export function getSoundsCardTrackBackground(volume: number): string {
  const percentage = volume / 100;
  return `linear-gradient(to right, rgb(var(--blue-mariner-700)) ${percentage * 100}%, rgb(var(--gray-charade-50)) ${percentage * 100}%)`;
}
