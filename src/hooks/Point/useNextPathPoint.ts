import GUID from "../../types/GUID.ts";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai/index";
import { pathAtom } from "../Path/usePath.ts";
import PathPoint from "../../types/PathPoint.ts";
import { rawPathAtom } from "../Path/useRawPath.ts";
import { atomFamily } from "jotai/utils";

export const nextPathPointAtomFamily = atomFamily((id: GUID) => {
    const pathPointAtom = atom(
        (get) => {
            const pathPlan = get(pathAtom);
            const index = pathPlan.points.findIndex((p) => p.id === id) + 1;
            if (index >= pathPlan.points.length || index < 0)
                return undefined;
            return pathPlan.points[index];
        },
        (get, set, point: PathPoint) => {
            const pathPlan = get(rawPathAtom);
            const index = pathPlan.points.findIndex((p) => p.id === id) + 1;
            const newPoints = [...pathPlan.points];
            newPoints[index] = {
                ...point,
                state: undefined
            };
            set(rawPathAtom, {
                ...pathPlan,
                points: newPoints,
            });
        }
    );
    pathPointAtom.debugLabel = `nextPathPointAtomFamily(${id})`;
    return pathPointAtom;
});

export function useNextPathPoint(id: GUID) {
    return useAtom(nextPathPointAtomFamily(id));
}

export default function useNextPathPointValue(id: GUID) {
    return useAtomValue(nextPathPointAtomFamily(id));
}

export function useSetNextPathPoint(id: GUID) {
    return useSetAtom(nextPathPointAtomFamily(id));
}