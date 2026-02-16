import GUID from "../../types/GUID.ts";
import useAutoStepPose from "../Pose/useAutoStepPose.ts";
import useAutoStep from "../AutoSteps/useAutoStep.ts";
import React from "react";
import DriveToStepType from "../../types/AutoSteps/AutoStepTypes/DriveToStepType.ts";
import {cubicLerpPose, distanceBetweenPoses, lerpPose} from "../../utils/poseUtils.ts";
import {toRadians} from "../../utils/UnitConversions.ts";

const DELTA_T = 0.01;
const DEFAULT_DELTA_SCALE = 0.5;

export default function usePathSplineSegment(
    fromAutoStepID: GUID,
    toAutoStepID: GUID
) {
    const fromPose = useAutoStepPose(fromAutoStepID);
    const toPose = useAutoStepPose(toAutoStepID);
    const [autoStep] = useAutoStep(toAutoStepID);

    return React.useMemo(() => {
        // Validation
        if (!fromPose || !toPose || !autoStep)
            return null;

        // Check if linear or spline
        const isSpline = autoStep.typeID === DriveToStepType.id;

        // Calculate deltas
        const distance = distanceBetweenPoses(fromPose, toPose);
        const delta = DEFAULT_DELTA_SCALE * distance;

        // Convert angles to radians
        const fromRads = toRadians(fromPose.r);
        const toRads = toRadians(toPose.r);

        // Calculate Anchor Points
        const a1 = {
            ...fromPose,
            x: fromPose.x + delta * Math.cos(fromRads),// * (fromPose.isReversed ? -1 : 1),
            y: fromPose.y + delta * Math.sin(fromRads)// * (fromPose.isReversed ? -1 : 1)
        };
        const a2 = {
            ...toPose,
            x: toPose.x - delta * Math.cos(toRads),
            y: toPose.y - delta * Math.sin(toRads)
        };

        // Sample points along the path
        const poses = [];
        for (let t = 0; t <= 1; t += DELTA_T) {
            if (isSpline)
                poses.push(cubicLerpPose(fromPose, a1, a2, toPose, t));
            else
                poses.push(lerpPose(fromPose, toPose, t));
        }

        // Always add the last pose
        poses.push(toPose);

        return poses;
    }, [fromPose, toPose, autoStep]);
}