import GUID from "../../types/GUID.ts";
import {atom, useAtom, useSetAtom} from "jotai";

// Atoms
export const selectedAutoStepIDAtom = atom<GUID | undefined>(undefined);

// Hooks
export default function useSelectedAutoStepID() {
    return useAtom(selectedAutoStepIDAtom);
}

export function useSetSelectedAutoStepID() {
    return useSetAtom(selectedAutoStepIDAtom);
}