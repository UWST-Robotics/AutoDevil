import {atom, useAtomValue} from "jotai";
import {autoStepsAtom} from "../AutoData/useAutoSteps.ts";
import {BLANK_POSE} from "../../types/Pose.ts";

export const autoStepPosesAtom = atom(get => {
    const autoSteps = get(autoStepsAtom);

    let prevPose = BLANK_POSE;
    return autoSteps.map((step) => {
        const stepPose = step.getPose(prevPose);
        if (stepPose)
            prevPose = stepPose;

        return stepPose;
    });
});

export default function useAutoStepPoses() {
    return useAtomValue(autoStepPosesAtom);
}