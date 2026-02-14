import {atom, useAtomValue} from "jotai";
import {autoStepsAtom} from "../AutoData/useAutoSteps.ts";
import {BLANK_POSE} from "../../types/Pose.ts";
import getAutoStepType from "../../utils/getAutoStepType.ts";

export const autoStepPosesAtom = atom(get => {
    const autoSteps = get(autoStepsAtom);

    let prevPose = BLANK_POSE;
    return autoSteps.map((step) => {

        // Get the step type for the current step
        const stepType = getAutoStepType(step);
        if (!stepType)
            throw new Error(`Unknown auto step type with ID ${step.typeID}`);

        // If the step type doesn't have a getPose function, return the previous pose
        if (!stepType.getPose)
            return prevPose;

        // Get the pose for the current step using the step type's getPose function
        const pose = stepType.getPose(step, prevPose);
        prevPose = pose;
        return pose;
    });
});

export default function useAutoStepPoses() {
    return useAtomValue(autoStepPosesAtom);
}