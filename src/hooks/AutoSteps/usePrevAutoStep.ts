import {atomFamily} from "jotai/utils";
import GUID from "../../types/GUID.ts";
import {atom, useAtom} from "jotai";
import AutoStep from "../../types/AutoSteps/AutoStep.ts";
import {autoStepsAtom} from "../AutoData/useAutoSteps.ts";

// Atoms
export const prevAutoStepAtomFamily = atomFamily((id: GUID) => atom((get) => {
        const autoSteps = get(autoStepsAtom);
        const index = autoSteps.findIndex((s) => s.id === id);
        if (index <= 0)
            return null;
        return autoSteps[index - 1];
    }, (get, set, step: AutoStep) => {
        const autoSteps = get(autoStepsAtom);
        set(autoStepsAtom, autoSteps.map((s) => s.id === step.id ? step : s));
    }
));

// Hooks
export default function usePrevAutoStep(id: GUID) {
    return useAtom(prevAutoStepAtomFamily(id));
}