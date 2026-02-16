import Pose from "../types/Pose.ts";
import {cubicLerp, lerp} from "./cubicLerp.ts";
import {toRadians} from "./UnitConversions.ts";

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

/**
 * Rotates a Pose object by a specified distance in the direction of its current rotation.
 * @param pose - The Pose object to be rotated.
 * @param angle - The angle in degrees by which to rotate the Pose object. Positive values rotate clockwise, while negative values rotate counterclockwise.
 * @returns A new Pose object that is the result of rotating the input Pose by the specified angle.
 */
export function rotatePose(pose: Pose, angle: number) {
    const radians = toRadians(pose.r);
    return {
        x: pose.x + Math.cos(radians),
        y: pose.y + Math.sin(radians),
        r: (pose.r + angle) % 360
    };
}

/**
 * Rotates a Pose object around the origin (0, 0) by a specified angle.
 * @param pose - The Pose object to be rotated.
 * @param angle - The angle in degrees by which to rotate the Pose object around the origin. Positive values rotate clockwise, while negative values rotate counterclockwise.
 * @return A new Pose object that is the result of rotating the input Pose around the origin by the specified angle.
 */
export function rotatePoseAroundOrigin(pose: Pose, angle: number) {
    const radians = toRadians(angle);
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    return {
        x: pose.x * cos - pose.y * sin,
        y: pose.x * sin + pose.y * cos,
        r: (pose.r + angle) % 360
    };
}

/**
 * Mirrors a Pose object across the vertical axis (y-axis).
 * @param pose - The Pose object to be mirrored.
 * @returns A new Pose object that is the result of mirroring the input Pose across the vertical axis.
 */
export function mirrorPoseVertical(pose: Pose) {
    return {
        x: pose.x,
        y: -pose.y,
        r: (360 - pose.r) % 360
    }
}

/**
 * Mirrors a Pose object across the horizontal axis (x-axis).
 * @param pose - The Pose object to be mirrored.
 * @returns A new Pose object that is the result of mirroring the input Pose across the horizontal axis.
 */
export function mirrorPoseHorizontal(pose: Pose) {
    return {
        x: -pose.x,
        y: pose.y,
        r: (180 - pose.r + 360) % 360
    }
}