import {atom, useAtomValue} from "jotai";
import {autoDataAtom} from "../AutoData/useAutoData.ts";
import {atomFamily} from "jotai/utils";
import GUID from "../../types/GUID.ts";
import getAutoStepInfo from "../../utils/getAutoStepInfo.ts";
import Pose, {BLANK_POSE} from "../../types/Pose.ts";

export const autoStepPoseAtomFamily = atomFamily((stepID: GUID) => atom((get) => {
    const autoData = get(autoDataAtom);

    // Recursive Function to Get Pose at Index
    const getPoseAtIndex = (index: number): Pose => {

        // TODO: Atomize recursive function

        // Handle Out of Bounds
        if (index < 0 || index >= autoData.steps.length)
            return BLANK_POSE;

        // Handle Initial Step
        const step = autoData.steps[index];
        if (index === 0)
            return step.pose ?? BLANK_POSE;

        // Get Previous Pose
        const prevPose = getPoseAtIndex(index - 1);

        // Get AutoStepInfo
        const autoStepInfo = getAutoStepInfo(step.type);
        if (!autoStepInfo)
            return prevPose;

        // Get the Pose
        return autoStepInfo.getPose(step, prevPose);
    }

    const index = autoData.steps.findIndex((s) => s.id === stepID);
    return getPoseAtIndex(index);
}));

export default function useAutoStepPose(stepID: GUID) {
    return useAtomValue(autoStepPoseAtomFamily(stepID));
}