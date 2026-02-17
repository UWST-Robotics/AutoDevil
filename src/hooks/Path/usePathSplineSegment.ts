import React from "react";
import {cubicLerpPose, distanceBetweenPoses, isBehindPose, lerpPose} from "../../utils/poseUtils.ts";
import {toDegrees, toRadians} from "../../utils/UnitConversions.ts";
import Pose from "../../types/Pose.ts";
import SplineType from "../../types/SplineType.ts";

const DELTA_T = 0.01;
const DEFAULT_DELTA_SCALE = 0.5;

export default function usePathSplineSegment(
    fromPose: Pose,
    toPose: Pose,
    type: SplineType = "spline",
) {
    return React.useMemo(() => {
        // Validation
        if (!fromPose || !toPose)
            return null;

        // Check if linear or spline
        const isSpline = type === "spline";
        const isReversed = isBehindPose(fromPose, toPose);

        // Calculate deltas
        const distance = distanceBetweenPoses(fromPose, toPose);
        const delta = DEFAULT_DELTA_SCALE * distance;

        // Convert angles to radians
        const fromRads = toRadians(fromPose.r);
        const toRads = toRadians(toPose.r);

        // Calculate Anchor Points
        const a1 = {
            ...fromPose,
            x: fromPose.x + delta * Math.cos(fromRads) * (isReversed ? -1 : 1),
            y: fromPose.y + delta * Math.sin(fromRads) * (isReversed ? -1 : 1)
        };
        const a2 = {
            ...toPose,
            x: toPose.x - delta * Math.cos(toRads) * (isReversed ? -1 : 1),
            y: toPose.y - delta * Math.sin(toRads) * (isReversed ? -1 : 1)
        };

        // Sample points along the path
        const poses: Pose[] = [];
        for (let t = 0; t <= 1; t += DELTA_T) {
            if (isSpline)
                poses.push(cubicLerpPose(fromPose, a1, a2, toPose, t));
            else
                poses.push(lerpPose(fromPose, toPose, t));
        }

        // Always add the last pose
        poses.push(toPose);

        // Fix lerped rotation to match the direction of movement
        for (let i = 1; i < poses.length; i++) {
            const prevPose = poses[i - 1];
            const currPose = poses[i];

            // Calculate the angle of movement
            const movementAngle = Math.atan2(currPose.y - prevPose.y, currPose.x - prevPose.x);

            // Set the current pose's rotation to match the movement angle
            poses[i] = {...currPose, r: toDegrees(movementAngle)};
        }

        return poses;
    }, [fromPose, toPose, type]);
}