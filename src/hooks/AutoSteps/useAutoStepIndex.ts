import {atomFamily} from "jotai/utils";
import GUID from "../../types/GUID.ts";
import {atom, useAtomValue} from "jotai";
import {autoStepsAtom} from "../AutoData/useAutoSteps.ts";

export const autoStepIndexAtomFamily = atomFamily((id: GUID | undefined) => atom((get) => {
    const autoSteps = get(autoStepsAtom);
    const index = autoSteps.findIndex(s => s.id === id);
    if (index === -1)
        return undefined;
    return index;
}));

export default function useAutoStepIndex(id: GUID | undefined) {
    return useAtomValue(autoStepIndexAtomFamily(id));
}