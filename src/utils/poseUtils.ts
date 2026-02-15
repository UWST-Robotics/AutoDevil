import Pose from "../types/Pose.ts";
import {cubicLerp, lerp} from "./cubicLerp.ts";

/**
 * Performs linear interpolation between two Pose objects a and b based on a parameter t.
 * @param a - The first Pose object.
 * @param b - The second Pose object.
 * @param t - The interpolation parameter, typically between 0 and 1.
 * @returns A new Pose object that is the result of linear interpolation between a and b based on t.
 */
export function lerpPose(a: Pose, b: Pose, t: number): Pose {
    return {
        x: lerp(a.x, b.x, t),
        y: lerp(a.y, b.y, t),
        r: lerp(a.r, b.r, t)
    }
}

/**
 * Performs cubic interpolation between four Pose objects a, b, c, and d based on a parameter t.
 * @param a - The first Pose object.
 * @param b - The second Pose object.
 * @param c - The third Pose object.
 * @param d - The fourth Pose object.
 * @param t - The interpolation parameter, typically between 0 and 1.
 * @returns A new Pose object that is the result of cubic interpolation between a, b, c, and d based on t.
 */
export function cubicLerpPose(a: Pose, b: Pose, c: Pose, d: Pose, t: number): Pose {
    return {
        x: cubicLerp(a.x, b.x, c.x, d.x, t),
        y: cubicLerp(a.y, b.y, c.y, d.y, t),
        r: cubicLerp(a.r, b.r, c.r, d.r, t)
    }
}

/**
 * Calculates the distance between two Pose objects a and b using the Euclidean distance formula.
 * @param a - The first Pose object.
 * @param b - The second Pose object.
 */
export function distanceBetweenPoses(a: Pose, b: Pose): number {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}