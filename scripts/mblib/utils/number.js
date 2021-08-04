export function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
export function clamp(val, min, max) {
    return Math.max(Math.min(val, max), min);
}
export const vecsMatch = (vec0, vec1) => vec0[0] == vec1[0] && vec0[1] == vec1[1] && vec0[2] == vec1[2];
