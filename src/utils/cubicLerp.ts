import PathPoint from "../types/PathPoint.ts";

// Math
export function cubicLerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

export function rotationLerp(a: number, b: number, t: number) {
    if (Math.abs(a - b) > Math.PI) {
        if (a > b) {
            a -= Math.PI * 2;
        } else {
            b -= Math.PI * 2;
        }
    }
    return cubicLerp(a, b, t);
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