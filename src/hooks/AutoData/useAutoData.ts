import AutoData from "../../types/AutoData.ts";
import {atom, useAtom, useAtomValue} from "jotai";
import JumpToStepType from "../../types/AutoSteps/AutoStepTypes/JumpToStep.ts";
import createAutoStep from "../../utils/createAutoStep.ts";

export const DEFAULT_DATA: AutoData = {
    name: "New Autonomous",
    steps: [
        createAutoStep(JumpToStepType)
    ]
}

export const autoDataAtom = atom(DEFAULT_DATA);

export function useAutoData() {
    return useAtom(autoDataAtom);
}

export default function useRawAutoDataValue() {
    return useAtomValue(autoDataAtom);
}