export function clamp(min: number, value: number, max: number): number {
    return Math.max(Math.min(value, max), min);
}

export function lerp(min: number, max: number, t: number): number {
    return (max - min) * t + min;
}
