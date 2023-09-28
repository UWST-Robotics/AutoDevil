export default function toDegrees(radians: number): number {
    return radians * (180 / Math.PI);
}

export function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

export function normalizeRadians(radians: number): number {
    return (radians + 2 * Math.PI) % (2 * Math.PI);
}