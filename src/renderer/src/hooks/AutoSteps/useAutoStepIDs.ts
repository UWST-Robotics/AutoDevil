import {atom, useAtomValue} from "jotai";
import {rawAutoDataAtom} from "../AutoData/useAutoData.ts";

export const autoStepIDsAtom = atom((get) => {
    const autoData = get(rawAutoDataAtom);
    return autoData.steps.map((s) => s.id);
});

export default function useAutoStepIDs() {
    return useAtomValue(autoStepIDsAtom);
}