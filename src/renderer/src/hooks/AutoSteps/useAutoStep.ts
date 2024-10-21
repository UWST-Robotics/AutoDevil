import {atomFamily} from "jotai/utils";
import GUID from "../../types/GUID.ts";
import {atom, useAtom} from "jotai";
import {rawAutoDataAtom} from "../AutoData/useAutoData.ts";
import AutoStep from "../../types/AutoSteps/AutoStep.ts";

export const autoStepAtomFamily = atomFamily((id: GUID) => atom((get) => {
    const autoData = get(rawAutoDataAtom);
    return autoData.steps.find((s) => s.id === id);
}, (get, set, step: AutoStep) => {
    const autoData = get(rawAutoDataAtom);
    set(rawAutoDataAtom, {
        ...autoData,
        steps: autoData.steps.map((s) => s.id === step.id ? step : s)
    });
}));

export default function useAutoStep(id: GUID) {
    return useAtom(autoStepAtomFamily(id));
}