import AutoData from "../../types/AutoData.ts";
import {atom, useAtom, useAtomValue} from "jotai";
import generateGUID from "../../utils/generateGUID.ts";
import AutoStepType from "../../types/AutoSteps/AutoStepType.ts";
import AutoInitialStep from "../../types/AutoSteps/AutoInitialStep.ts";

export const DEFAULT_DATA: AutoData = {
    steps: [
        {
            id: generateGUID(),
            type: AutoStepType.START,
            pose: {x: 0, y: 0, r: 0}
        } as AutoInitialStep
    ],
    occupancyGrid: [],
}

export const rawAutoDataAtom = atom(DEFAULT_DATA);

export function useAutoData() {
    return useAtom(rawAutoDataAtom);
}

export default function useRawAutoDataValue() {
    return useAtomValue(rawAutoDataAtom);
}