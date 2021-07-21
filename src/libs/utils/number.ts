export function randomRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function clamp(val: number, min: number, max: number) {
  return Math.max(Math.min(val, max), min);
}
