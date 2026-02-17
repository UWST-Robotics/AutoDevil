import {atom, useSetAtom} from "jotai";
import GUID from "../../../types/GUID.ts";
import {autoStepsAtom} from "../../AutoData/useAutoSteps.ts";

// Atoms
export const deleteAutoStepAtom = atom(null, (get, set, autoStepID: GUID) => {
    const autoSteps = get(autoStepsAtom);
    set(autoStepsAtom, autoSteps.filter(autoStep => autoStep.id !== autoStepID));
});

// Hooks
export default function useDeleteAutoStep() {
    return useSetAtom(deleteAutoStepAtom);
}