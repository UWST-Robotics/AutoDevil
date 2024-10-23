import {atomFamily} from "jotai/utils";
import GUID from "../../types/GUID.ts";
import {atom, useAtom} from "jotai";
import {autoDataAtom} from "../AutoData/useAutoData.ts";
import AutoStep from "../../types/AutoSteps/AutoStep.ts";

// Atoms
export const prevAutoStepAtomFamily = atomFamily((id: GUID) => atom((get) => {
        const autoData = get(autoDataAtom);
        const index = autoData.steps.findIndex((s) => s.id === id);
        if (index <= 0)
            return null;
        return autoData.steps[index - 1];
    }, (get, set, step: AutoStep) => {
        const autoData = get(autoDataAtom);
        const index = autoData.steps.findIndex((s) => s.id === step.id);
        if (index <= 0)
            return;
        const newSteps = [...autoData.steps];
        newSteps[index - 1] = step;
        set(autoDataAtom, {
            ...autoData,
            steps: newSteps
        });
    }
));

// Hooks
export default function usePrevAutoStep(id: GUID) {
    return useAtom(prevAutoStepAtomFamily(id));
}