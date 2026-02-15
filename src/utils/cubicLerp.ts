/**
 * Performs linear interpolation between two values a and b based on a parameter t.
 * @param a - The starting value.
 * @param b - The ending value.
 * @param t - The interpolation parameter, typically between 0 and 1.
 * @returns The interpolated value between a and b based on t.
 */
export function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

/**
 * Performs quadratic interpolation between three values a, b, and c based on a parameter t.
 * @param a - The first value.
 * @param b - The second value.
 * @param c - The third value.
 * @param t - The interpolation parameter, typically between 0 and 1.
 */
export function quadraticLerp(a: number, b: number, c: number, t: number) {
    const ab = lerp(a, b, t);
    const bc = lerp(b, c, t);
    return lerp(ab, bc, t);
}

/**
 * Performs cubic interpolation between four values a, b, c, and d based on a parameter t.
 * @param a - The first value.
 * @param b - The second value.
 * @param c - The third value.
 * @param d - The fourth value.
 * @param t - The interpolation parameter, typically between 0 and 1.
 * @returns The interpolated value between a, b, c, and d based on t.
 */
export function cubicLerp(a: number, b: number, c: number, d: number, t: number) {
    const abc = quadraticLerp(a, b, c, t);
    const bcd = quadraticLerp(b, c, d, t);
    return lerp(abc, bcd, t);
}