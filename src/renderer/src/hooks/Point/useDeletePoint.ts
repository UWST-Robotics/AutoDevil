import {atom, useSetAtom} from "jotai";
import GUID from "../../types/GUID.ts";
import {autoDataAtom} from "../AutoData/useAutoData.ts";
import {selectedPointAtom} from "./useSelectPoint.ts";

export const deletePointAtom = atom(
    null,
    (get, set, pointId: GUID | undefined) => {
        if (!pointId)
            return;

        const path = get(autoDataAtom);
        if (path.points.length <= 2)
            return;

        const newPoints = path.points.filter((p) => p.id !== pointId);
        set(autoDataAtom, {...path, points: newPoints});

        const selectedPointID = get(selectedPointAtom);
        if (selectedPointID === pointId) {
            set(selectedPointAtom, undefined);
        }
    }
);

export default function useDeletePoint() {
    return useSetAtom(deletePointAtom);
}