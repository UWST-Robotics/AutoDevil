import PathPlan from "../../types/PathPlan.ts";
import { atom, useAtom, useAtomValue } from "jotai";
import generateGUID from "../../utils/generateGUID.ts";

export const DEFAULT_PATH: PathPlan = {
    points: [
        { id: generateGUID(), x: -24, y: 0, r: Math.PI * 0.5, enterDelta: 12, exitDelta: 12 },
        { id: generateGUID(), x: 0, y: 24, r: 0, enterDelta: 12, exitDelta: 12 },
        { id: generateGUID(), x: 24, y: 0, r: Math.PI * 1.5, enterDelta: 12, exitDelta: 12 },
    ],
}

export const rawPathAtom = atom(DEFAULT_PATH);

export function useRawPath() {
    return useAtom(rawPathAtom);
}

export default function useRawPathValue() {
    return useAtomValue(rawPathAtom);
}