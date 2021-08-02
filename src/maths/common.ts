export const negFract = (x: number) => 1.0 - x + Math.floor(x);
export const fract = (x: number) => x - Math.floor(x);

export const clamp = (a: number, min: number, max: number) =>
  Math.max(Math.min(a, max), min);
export const timeAtPos = (startPos: number, dir: number, newPos: number) =>
  dir ? clamp((newPos - startPos) / dir, 0, 1) : 0;
export const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;
