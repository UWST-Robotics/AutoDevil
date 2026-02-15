//const DEFAULT_DELTA_T = 0.001; // Time segment to sample

import React from "react";
import useAutoStepPoses from "../Pose/useAutoStepPoses.ts";
import {useAutoSteps} from "../AutoData/useAutoSteps.ts";
import DriveToStepType from "../../types/AutoSteps/AutoStepTypes/DriveToStepType.ts";
import {cubicLerpPose, distanceBetweenPoses, lerpPose} from "../../utils/poseUtils.ts";

const DEFAULT_DELTA_SCALE = 0.25;

export default function usePathSpline(_?: number) {
    const [autoSteps] = useAutoSteps();
    const poses = useAutoStepPoses();

    // Point
    const pointAt = React.useCallback((t: number) => {
        // Index
        const index = Math.floor(t);
        if (index >= poses.length - 1)
            return poses[poses.length - 1];
        if (index < 0)
            return poses[0];

        // Points
        const p1 = {...poses[index]};
        const p2 = {...poses[index + 1]};

        // Linear Lerp
        const isSpline = autoSteps[index]?.typeID === DriveToStepType.id;
        if (!isSpline)
            return lerpPose(p1, p2, t - index);

        // Calculate deltas
        const distance = distanceBetweenPoses(p1, p2);
        const delta = DEFAULT_DELTA_SCALE * distance;

        // Anchor points
        const a1 = {
            ...p1,
            x: p1.x + delta * Math.cos(p1.r),// * (p1.isReversed ? -1 : 1),
            y: p1.y + delta * Math.sin(p1.r)// * (p1.isReversed ? -1 : 1)
        };
        const a2 = {
            ...p2,
            x: p2.x - delta * Math.cos(p2.r),
            y: p2.y - delta * Math.sin(p2.r)
        };
        // Cubic Lerp
        return cubicLerpPose(p1, a1, a2, p2, t - index);
    }, [poses, autoSteps]);

    return {
        length: poses.length,
        getPointAt: pointAt
    };
}