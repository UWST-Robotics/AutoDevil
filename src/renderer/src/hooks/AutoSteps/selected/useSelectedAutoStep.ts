import {atom, useAtom} from "jotai";
import {selectedAutoStepIDAtom} from "./useSelectedAutoStepID.ts";
import {autoStepAtomFamily} from "../useAutoStep.ts";

// Atoms
export const selectedAutoStepAtom = atom((get) => {
    const selectedAutoStepID = get(selectedAutoStepIDAtom);
    if (!selectedAutoStepID)
        return undefined;

    return get(autoStepAtomFamily(selectedAutoStepID));
});

// Hooks
export default function useSelectedAutoStep() {
    return useAtom(selectedAutoStepAtom);
}