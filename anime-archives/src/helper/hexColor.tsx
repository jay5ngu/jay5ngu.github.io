export function hexToPastel(hex: string, saturation = 55, lightness = 80): string {
  // Strip # and parse RGB
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
      case g: h = ((b - r) / d + 2) * 60; break;
      case b: h = ((r - g) / d + 4) * 60; break;
    }
  }

  // Return pastel version using original hue, fixed saturation/lightness
  return `hsl(${h.toFixed(0)}, ${saturation}%, ${lightness}%)`;
}

export function getSpineTextColor(hex?: string): string {
  const defaultColor = '#E7C989';

  if (!hex) return defaultColor;

  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  // Relative luminance (perceived brightness)
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  // Pastels are light backgrounds, so default to a dark, muted text color
  // unless the pastel skews dark enough that gold reads better
  return luminance > 0.6 ? '#4A3826' : defaultColor;
}