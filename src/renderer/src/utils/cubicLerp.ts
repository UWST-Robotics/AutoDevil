import PathPoint from "../types/PathPoint.ts";
import { normalizeRadians } from "./toDegrees.ts";

// Math
export function cubicLerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

export function rotationLerp(a: number, b: number, t: number, normalize = true) {
    if (!normalize)
        return cubicLerp(a, b, t);

    // Check if we're going clockwise or counterclockwise
    const aMod = a % (2 * Math.PI);
    const bMod = b % (2 * Math.PI);
    const diff = Math.abs(aMod - bMod);
    if (diff > Math.PI) {
        if (aMod > bMod) {
            return normalizeRadians(cubicLerp(aMod, bMod + 2 * Math.PI, t));
        } else {
            return normalizeRadians(cubicLerp(aMod + 2 * Math.PI, bMod, t));
        }
    }
    return normalizeRadians(cubicLerp(aMod, bMod, t)); // Normal
}

// Points
export function lerpPoints(a: PathPoint, b: PathPoint, t: number, normalize = true): PathPoint {
    return {
        ...a,
        x: cubicLerp(a.x, b.x, t),
        y: cubicLerp(a.y, b.y, t),
        r: rotationLerp(a.r, b.r, t),
        state: {
            isReversed: a.state?.isReversed ?? false,
            gyro: rotationLerp(a.state?.gyro ?? 0, b.state?.gyro ?? 0, t, normalize)
        }
    };
}

export function quadraticLerpPoints(a: PathPoint, b: PathPoint, c: PathPoint, t: number, normalize = true): PathPoint {
    const ab = lerpPoints(a, b, t, normalize);
    const bc = lerpPoints(b, c, t, normalize);
    return lerpPoints(ab, bc, t, normalize);
}

export default function cubicLerpPoints(a: PathPoint, b: PathPoint, c: PathPoint, d: PathPoint, t: number, normalize = true): PathPoint {
    const abc = quadraticLerpPoints(a, b, c, t, normalize);
    const bcd = quadraticLerpPoints(b, c, d, t, normalize);
    return lerpPoints(abc, bcd, t);
}