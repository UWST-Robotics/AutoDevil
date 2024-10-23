import {atom, useSetAtom} from "jotai";
import AutoStep from "../../types/AutoSteps/AutoStep.ts";
import {autoDataAtom} from "../AutoData/useAutoData.ts";

// Atoms
export const addAutoStepAtom = atom(null, (get, set, autoStep: AutoStep) => {
    const autoData = get(autoDataAtom);
    set(autoDataAtom, {
        ...autoData,
        steps: [...autoData.steps, autoStep]
    });
});

// Hooks
export default function useAddAutoStep() {
    return useSetAtom(addAutoStepAtom);
}