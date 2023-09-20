import PathPoint from "../types/PathPoint.ts";

// Math
export function cubicLerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

export function rotationLerp(a: number, b: number, t: number) {
    const aMod = a % (2 * Math.PI) + (Math.PI / 2);
    const bMod = b % (2 * Math.PI) + (Math.PI / 2);
    const diff = Math.abs(aMod - bMod);
    if (diff > Math.PI) {
        if (aMod > bMod) {
            return cubicLerp(aMod, bMod + 2 * Math.PI, t);
        } else {
            return cubicLerp(aMod + 2 * Math.PI, bMod, t);
        }
    }
    return cubicLerp(aMod, bMod, t);
}

// Points
export function lerpPoints(a: PathPoint, b: PathPoint, t: number): PathPoint {
    return {
        ...a,
        x: cubicLerp(a.x, b.x, t),
        y: cubicLerp(a.y, b.y, t),
        r: rotationLerp(a.r, b.r, t),
    };
}

export function quadraticLerpPoints(a: PathPoint, b: PathPoint, c: PathPoint, t: number): PathPoint {
    const ab = lerpPoints(a, b, t);
    const bc = lerpPoints(b, c, t);
    return lerpPoints(ab, bc, t);
}

export default function cubicLerpPoints(a: PathPoint, b: PathPoint, c: PathPoint, d: PathPoint, t: number): PathPoint {
    const abc = quadraticLerpPoints(a, b, c, t);
    const bcd = quadraticLerpPoints(b, c, d, t);
    return lerpPoints(abc, bcd, t);
}