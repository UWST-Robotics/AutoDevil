import { atomFamily } from "jotai/utils";
import GUID from "../types/GUID.ts";
import { atom, useAtomValue } from "jotai";
import { pathPlanAtom } from "./usePathPlan.tsx";

export const pathStartAtomFamily = atomFamily((id: GUID) => {
    const pathStartArom = atom<boolean>(
        (get) => {
            const path = get(pathPlanAtom);
            const index = path.points.findIndex((p) => p.id === id);
            return index === 0;
        }
    );
    pathStartArom.debugLabel = `pathStartAtom(${id})`;
    return pathStartArom;
});
export const pathEndAtomFamily = atomFamily((id: GUID) => {
    const pathEndAtom = atom<boolean>(
        (get) => {
            const path = get(pathPlanAtom);
            const index = path.points.findIndex((p) => p.id === id);
            return index === path.points.length - 1;
        }
    );
    pathEndAtom.debugLabel = `pathEndAtom(${id})`;
    return pathEndAtom;
});

export default function usePathEnds(id: GUID) {
    const isStart = useAtomValue(pathStartAtomFamily(id));
    const isEnd = useAtomValue(pathEndAtomFamily(id));
    return {
        isStart,
        isEnd,
    };
}