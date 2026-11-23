export const SPECTRUM_COLORS = [
  '#CCFF00', // Acid Volt
  '#00F0FF', // Electric Cyan
  '#FF2A5F', // Cyber Crimson
  '#9D4EDD', // Hyper Violet
  '#FFB703', // Solar Amber
  '#FF00C8', // Plasma Magenta
  '#00F59B', // Emerald Pulse
  '#3A86FF', // Cobalt Surge
  '#FF5D38', // Coral Flare
  '#64FFDA', // Laser Mint
  '#7B2CBF', // Ultraviolet
  '#F4F4F0'  // Ice White
];

export function getRandomSpectrumColor(index?: number): string {
  if (index !== undefined) {
    return SPECTRUM_COLORS[index % SPECTRUM_COLORS.length];
  }
  return SPECTRUM_COLORS[Math.floor(Math.random() * SPECTRUM_COLORS.length)];
}
