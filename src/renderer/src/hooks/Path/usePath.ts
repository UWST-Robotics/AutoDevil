import { atom, useAtomValue } from "jotai";
import { rawPathAtom } from "./useRawPath.ts";
import PathPlan from "../../types/PathPlan.ts";
import { normalizeRadians } from "../../utils/toDegrees.ts";

export const pathAtom = atom<PathPlan>((get) => {
    const rawPath = get(rawPathAtom);
    const path = { ...rawPath };

    let isReversed = false;
    const reverseArr: boolean[] = [];
    path.points.forEach((p) => {
        if (p.isReversed)
            isReversed = !isReversed;
        reverseArr.push(isReversed);
    });

    path.points = rawPath.points.map((p, i) => ({
        ...p,
        state: {
            isReversed: reverseArr[i],
            gyro: normalizeRadians(p.r + (reverseArr[i - 1] ? Math.PI : 0)),
        }
    }));

    return path;
});

export default function usePathValue() {
    return useAtomValue(pathAtom);
}