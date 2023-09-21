import { atom, useSetAtom } from "jotai";
import { pathPlanAtom } from "./usePathPlan.ts";
import generateGUID from "../utils/generateGUID.ts";
import PathPoint from "../types/PathPoint.ts";
import { selectedPointAtom } from "./useSelectPoint.ts";

export interface AddPointPayload {
    index: number;
    x: number;
    y: number;
    r: number;
}

export const addPointAtom = atom(null, (get, set, payload: AddPointPayload) => {
    const path = get(pathPlanAtom);
    const point: PathPoint = {
        id: generateGUID(),
        x: payload.x,
        y: payload.y,
        r: payload.r,
        enterDelta: 12,
        exitDelta: 12,
    };
    // Update path
    const newPoints = [...path.points];
    newPoints.splice(payload.index, 0, point);
    set(pathPlanAtom, { ...path, points: newPoints });

    // Select point
    set(selectedPointAtom, point.id);
});

export default function useAddPoint() {
    return useSetAtom(addPointAtom);
}