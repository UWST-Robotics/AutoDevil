import {atom, useSetAtom} from "jotai";
import {selectedAutoStepIDAtom} from "../selected/useSelectedAutoStepID.ts";
import {deleteAutoStepAtom} from "./useDeleteAutoStep.ts";

// Atoms
export const deleteSelectedAutoStepAtom = atom(null, (get, set) => {
    const selectedAutoStepID = get(selectedAutoStepIDAtom);
    if (!selectedAutoStepID)
        return;
    set(deleteAutoStepAtom, selectedAutoStepID);
});

// Hooks
export default function useDeleteSelectedAutoStep() {
    return useSetAtom(deleteSelectedAutoStepAtom);
}