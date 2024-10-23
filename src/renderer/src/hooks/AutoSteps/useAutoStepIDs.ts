import {atom, useAtomValue} from "jotai";
import {autoDataAtom} from "../AutoData/useAutoData.ts";

export const autoStepIDsAtom = atom((get) => {
    const autoData = get(autoDataAtom);
    return autoData.steps.map((s) => s.id);
});

export default function useAutoStepIDs() {
    return useAtomValue(autoStepIDsAtom);
}