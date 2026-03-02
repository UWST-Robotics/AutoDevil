import {atom, useSetAtom} from "jotai";
import {autoStepsAtom} from "../../AutoData/useAutoSteps.ts";
import {saveHistoryAtom} from "../../Utils/useUndoHistory.ts";
import {rotatePoseAroundOrigin} from "../../../utils/poseUtils.ts";


// Atoms
export const rotateAutoStepsAtom = atom(null, (get, set, clockwise: boolean) => {
    const autoSteps = get(autoStepsAtom);

    for (let i = 0; i < autoSteps.length; i++) {
        const autoStep = autoSteps[i];

        // Mirror Pose
        if (autoStep.pose)
            autoStep.pose = rotatePoseAroundOrigin(autoStep.pose, clockwise ? 90 : 270);

        autoSteps[i] = {...autoStep};
    }

    set(autoStepsAtom, [...autoSteps]);
    set(saveHistoryAtom);
});

// Hooks
export default function useRotateAutoSteps() {
    return useSetAtom(rotateAutoStepsAtom);
}