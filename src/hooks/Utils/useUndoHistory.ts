import { atom, useAtom, useSetAtom } from "jotai";
import PathPlan from "../../types/PathPlan.ts";
import { DEFAULT_PATH, rawPathAtom } from "../Path/useRawPath.ts";

const MAX_HISTORY = 30;

const pathHistoryAtom = atom<PathPlan[]>([DEFAULT_PATH]);
const pathHistoryIndexAtom = atom(0);

export const undoAtom = atom((get) => {
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

export const redoAtom = atom((get) => {
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

export const saveHistoryAtom = atom(null, (get, set) => {
    const history = get(pathHistoryAtom);
    const index = get(pathHistoryIndexAtom);
    const path = get(rawPathAtom);


    // Slice off the redo history
    const newHistory = [...history.slice(0, index + 1), path];

    // Trim the history to the max length
    if (newHistory.length > MAX_HISTORY)
        newHistory.shift();

    // Save the new history
    set(pathHistoryAtom, newHistory);

    // Set the new index
    set(pathHistoryIndexAtom, newHistory.length - 1);
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