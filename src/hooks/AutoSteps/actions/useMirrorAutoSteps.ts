import {atom, useSetAtom} from "jotai";
import {autoStepsAtom} from "../../AutoData/useAutoSteps.ts";
import {saveHistoryAtom} from "../../Utils/useUndoHistory.ts";
import {mirrorPoseHorizontal, mirrorPoseVertical} from "../../../utils/poseUtils.ts";

// Atoms
export const mirrorAutoStepsAtom = atom(null, (get, set, vertical: boolean) => {
    const autoSteps = get(autoStepsAtom);

    for (let i = 0; i < autoSteps.length; i++) {
        const autoStep = autoSteps[i];

        // Mirror Pose
        if (autoStep.pose) {
            autoStep.pose = vertical ?
                mirrorPoseVertical(autoStep.pose) :
                mirrorPoseHorizontal(autoStep.pose);
        }
        
        autoSteps[i] = {...autoStep};
    }

    set(autoStepsAtom, [...autoSteps]);
    set(saveHistoryAtom);
});

// Hooks
export default function useMirrorAutoSteps() {
    return useSetAtom(mirrorAutoStepsAtom);
}