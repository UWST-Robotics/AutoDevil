import AutoData from "../../types/AutoData.ts";
import { atom, useAtom, useAtomValue } from "jotai";
import generateGUID from "../../utils/generateGUID.ts";

export const DEFAULT_DATA: AutoData = {
    points: [
        { id: generateGUID(), x: -24, y: 0, r: Math.PI * 0.5, enterDelta: 12, exitDelta: 12 },
        { id: generateGUID(), x: 0, y: 24, r: 0, enterDelta: 12, exitDelta: 12 },
        { id: generateGUID(), x: 24, y: 0, r: Math.PI * 1.5, enterDelta: 12, exitDelta: 12 },
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