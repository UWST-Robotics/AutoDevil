import {atom, useSetAtom} from "jotai";
import {autoDataAtom} from "../AutoData/useAutoData.ts";
import generateGUID from "../../utils/generateGUID.ts";
import AutoStep from "../../types/AutoSteps/AutoStep.ts";
import {selectedPointAtom} from "./useSelectPoint.ts";

export interface AddPointPayload {
    index: number;
    x: number;
    y: number;
    r: number;
}

export const addPointAtom = atom(null, (get, set, payload: AddPointPayload) => {
    const path = get(autoDataAtom);
    const point: AutoStep = {
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
    set(autoDataAtom, {...path, points: newPoints});

    // Select point
    set(selectedPointAtom, point.id);
});

export default function useAddPoint() {
    return useSetAtom(addPointAtom);
}