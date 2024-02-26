import { atom, useSetAtom } from "jotai";
import GUID from "../../types/GUID.ts";
import { rawPathAtom } from "../Path/useRawPath.ts";
import { selectedPointAtom } from "./useSelectPoint.ts";

export const deletePointAtom = atom(
    null,
    (get, set, pointId: GUID) => {
        const path = get(rawPathAtom);
        if (path.points.length <= 2)
            return;

        const newPoints = path.points.filter((p) => p.id !== pointId);
        set(rawPathAtom, { ...path, points: newPoints });

        const selectedPointID = get(selectedPointAtom);
        if (selectedPointID === pointId) {
            set(selectedPointAtom, undefined);
        }
    }
);

export default function useDeletePoint() {
    return useSetAtom(deletePointAtom);
}