import {atom, useSetAtom} from "jotai";
import AutoStep from "../../../types/AutoSteps/AutoStep.ts";
import {autoStepsAtom} from "../../AutoData/useAutoSteps.ts";

// Atoms
export const addAutoStepAtom = atom(null, (get, set, autoStep: AutoStep) => {
    const autoSteps = get(autoStepsAtom);
    set(autoStepsAtom, [...autoSteps, autoStep]);
});

// Hooks
export default function useAddAutoStep() {
    return useSetAtom(addAutoStepAtom);
}