import {focusAtom} from "jotai-optics";
import {autoDataAtom} from "./useAutoData.ts";
import {useAtom} from "jotai";

// Atoms
export const autoStepsAtom = focusAtom(autoDataAtom, (o) => o.prop('steps'));

// Hooks
export function useAutoSteps() {
    return useAtom(autoStepsAtom);
}