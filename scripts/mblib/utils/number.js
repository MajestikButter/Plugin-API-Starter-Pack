export function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
export function clamp(val, min, max) {
    return Math.max(Math.min(val, max), min);
}
