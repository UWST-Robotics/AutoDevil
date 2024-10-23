import {atom, useAtom, useSetAtom} from "jotai";
import AutoData from "../../types/AutoData.ts";
import {autoDataAtom, DEFAULT_DATA} from "../AutoData/useAutoData.ts";

const MAX_HISTORY = 30;

const fileHistoryAtom = atom<AutoData[]>([DEFAULT_DATA]);
const fileHistoryIndexAtom = atom(0);

export const undoAtom = atom((get) => {
        const index = get(fileHistoryIndexAtom);
        return index > 0;
    },
    (get, set) => {
        const index = get(fileHistoryIndexAtom);
        const history = get(fileHistoryAtom);
        if (index > 0) {
            set(fileHistoryIndexAtom, index - 1);
            set(autoDataAtom, history[index - 1]);
        }
    }
);

export const redoAtom = atom((get) => {
        const index = get(fileHistoryIndexAtom);
        const history = get(fileHistoryAtom);
        return index < history.length - 1;
    },
    (get, set) => {
        const index = get(fileHistoryIndexAtom);
        const history = get(fileHistoryAtom);
        if (index < history.length - 1) {
            set(fileHistoryIndexAtom, index + 1);
            set(autoDataAtom, history[index + 1]);
        }
    }
);

export const saveHistoryAtom = atom(null, (get, set) => {
    const history = get(fileHistoryAtom);
    const index = get(fileHistoryIndexAtom);
    const path = get(autoDataAtom);


    // Slice off the redo history
    const newHistory = [...history.slice(0, index + 1), path];

    // Trim the history to the max length
    if (newHistory.length > MAX_HISTORY)
        newHistory.shift();

    // Save the new history
    set(fileHistoryAtom, newHistory);

    // Set the new index
    set(fileHistoryIndexAtom, newHistory.length - 1);
});

export function useUndoChanges() {
    return useAtom(undoAtom);
}

export function useRedoChanges() {
    return useAtom(redoAtom);
}

export default function useSaveUndoHistory() {
    return useSetAtom(saveHistoryAtom);
}