import AutoData from "../../types/AutoData.ts";
import {atom, useAtom, useAtomValue} from "jotai";
import {InitialStepType} from "../../types/AutoSteps/InitialStep.ts";

export const DEFAULT_DATA: AutoData = {
    steps: [
        InitialStepType.createNew()
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