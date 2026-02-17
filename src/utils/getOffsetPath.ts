import Pose from "../types/Pose.ts";
import Vector2 from "../types/Vector2.ts";
import {offsetPose} from "./poseUtils.ts";

/**
 * Gets a new path with the given offset applied to each pose in the path.
 * @param path - An array of Pose objects representing the original path.
 * @param offset - An object containing the distances to offset in the x and y directions.
 * @returns A new array of Pose objects representing the offset path.
 */
export default function getOffsetPath(path: Pose[], offset: Vector2) {
    return path.map(pose => offsetPose(pose, offset));
}