import GUID from "../../types/GUID.ts";
import {atom, useAtom, useAtomValue, useSetAtom} from "jotai/index";
import {pathAtom} from "../Path/usePath.ts";
import AutoStep from "../../types/AutoSteps/AutoStep.ts";
import {autoDataAtom} from "../AutoData/useAutoData.ts";
import {atomFamily} from "jotai/utils";

export const prevPathPointAtomFamily = atomFamily((id: GUID) => {
    const pathPointAtom = atom(
        (get) => {
            const pathPlan = get(pathAtom);
            const index = pathPlan.points.findIndex((p) => p.id === id) - 1;
            if (index >= pathPlan.points.length || index < 0)
                return undefined;
            return pathPlan.points[index];
        },
        (get, set, point: AutoStep) => {
            const pathPlan = get(autoDataAtom);
            const index = pathPlan.points.findIndex((p) => p.id === id) - 1;
            const newPoints = [...pathPlan.points];
            newPoints[index] = {
                ...point,
                state: undefined
            };
            set(autoDataAtom, {
                ...pathPlan,
                points: newPoints,
            });
        }
    );
    pathPointAtom.debugLabel = `prevPathPointAtomFamily(${id})`;
    return pathPointAtom;
});

export function usePrevPathPoint(id: GUID) {
    return useAtom(prevPathPointAtomFamily(id));
}

export default function usePrevPathPointValue(id: GUID) {
    return useAtomValue(prevPathPointAtomFamily(id));
}

export function useSetPrevPathPoint(id: GUID) {
    return useSetAtom(prevPathPointAtomFamily(id));
}