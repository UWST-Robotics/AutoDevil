import {atom, useAtomValue} from "jotai";
import {autoStepsAtom} from "../AutoData/useAutoSteps.ts";

export const autoStepIDsAtom = atom((get) => {
    const autoSteps = get(autoStepsAtom);
    return autoSteps.map((s) => s.id);
});

export default function useAutoStepIDs() {
    return useAtomValue(autoStepIDsAtom);
}