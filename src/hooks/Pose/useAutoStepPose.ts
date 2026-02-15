import {atom, useAtomValue} from "jotai";
import {atomFamily} from "jotai/utils";
import GUID from "../../types/GUID.ts";
import {DEFAULT_POSE} from "../../types/Pose.ts";
import {autoStepsAtom} from "../AutoData/useAutoSteps.ts";
import {autoStepPosesAtom} from "./useAutoStepPoses.ts";

export const autoStepPoseAtomFamily = atomFamily((stepID: GUID | undefined) => atom((get) => {

    // Get the index of the step with the given ID
    const autoSteps = get(autoStepsAtom);
    const index = autoSteps.findIndex((s) => s.id === stepID);
    if (index === -1)
        return DEFAULT_POSE;

    // Get the poses for all steps and return the pose at the found index
    const autoStepPoses = get(autoStepPosesAtom);
    return autoStepPoses[index];
}));

export default function useAutoStepPose(stepID: GUID | undefined) {
    return useAtomValue(autoStepPoseAtomFamily(stepID));
}