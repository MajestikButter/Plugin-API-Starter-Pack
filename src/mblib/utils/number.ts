export function randomRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function clamp(val: number, min: number, max: number) {
  return Math.max(Math.min(val, max), min);
}

export const vecsMatch = (vec0: [number, number, number], vec1: [number, number, number]) =>
  vec0[0] == vec1[0] && vec0[1] == vec1[1] && vec0[2] == vec1[2];
