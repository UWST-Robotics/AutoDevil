import {atom, useAtomValue} from "jotai";
import {rawAutoDataAtom} from "../AutoData/useAutoData.ts";
import AutoData from "../../types/AutoData.ts";

export const pathAtom = atom<AutoData>((get) => {
    const rawData = get(rawAutoDataAtom);
    const path = {...rawData};

    let isReversed = false;
    const reverseArr: boolean[] = [];
    path.points.forEach((p) => {
        if (p.isReversed)
            isReversed = !isReversed;
        reverseArr.push(isReversed);
    });

    path.points = rawData.points.map((p, i) => ({
        ...p,
        state: {
            isReversed: reverseArr[i],
            gyro: p.r + (reverseArr[i - 1] ? Math.PI : 0),
        }
    }));

    return path;
});

export default function usePathValue() {
    return useAtomValue(pathAtom);
}