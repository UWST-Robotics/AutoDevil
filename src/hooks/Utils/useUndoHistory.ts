import { atom, useAtom, useSetAtom } from "jotai";
import PathPlan from "../../types/PathPlan.ts";
import { DEFAULT_PATH, rawPathAtom } from "../Path/useRawPath.ts";

const pathHistoryAtom = atom<PathPlan[]>([DEFAULT_PATH]);
const pathHistoryIndexAtom = atom(0);

const undoAtom = atom((get) => {
        const index = get(pathHistoryIndexAtom);
        return index > 0;
    },
    (get, set) => {
        const index = get(pathHistoryIndexAtom);
        const history = get(pathHistoryAtom);
        if (index > 0) {
            set(pathHistoryIndexAtom, index - 1);
            set(rawPathAtom, history[index - 1]);
        }
    }
);

const redoAtom = atom((get) => {
        const index = get(pathHistoryIndexAtom);
        const history = get(pathHistoryAtom);
        return index < history.length - 1;
    },
    (get, set) => {
        const index = get(pathHistoryIndexAtom);
        const history = get(pathHistoryAtom);
        if (index < history.length - 1) {
            set(pathHistoryIndexAtom, index + 1);
            set(rawPathAtom, history[index + 1]);
        }
    }
);

const saveHistoryAtom = atom(null, (get, set) => {
    const history = get(pathHistoryAtom);
    const index = get(pathHistoryIndexAtom);
    const path = get(rawPathAtom);
    set(pathHistoryAtom, [...history.slice(0, index + 1), path]);
    set(pathHistoryIndexAtom, index + 1);
});

export function useUndoPath() {
    return useAtom(undoAtom);
}

export function useRedoPath() {
    return useAtom(redoAtom);
}

export default function useSavePathHistory() {
    return useSetAtom(saveHistoryAtom);
}