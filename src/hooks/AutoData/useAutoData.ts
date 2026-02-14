import AutoData from "../../types/AutoData.ts";
import {atom, useAtom, useAtomValue} from "jotai";
import JumpToStepType from "../../types/AutoSteps/AutoStepTypes/JumpToStep.ts";

export const DEFAULT_DATA: AutoData = {
    steps: [
        JumpToStepType.createNew()
    ],
    occupancyGrid: [],
}

export const autoDataAtom = atom(DEFAULT_DATA);

export function useAutoData() {
    return useAtom(autoDataAtom);
}

export default function useRawAutoDataValue() {
    return useAtomValue(autoDataAtom);
}