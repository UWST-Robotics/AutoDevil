import GUID from "../../types/GUID.ts";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

export const selectedPointAtom = atom<GUID | undefined>(undefined);

export default function useSelectedPoint() {
    return useAtom(selectedPointAtom);
}

export function useSelectedPointValue() {
    return useAtomValue(selectedPointAtom);
}

export function useSetSelectedPoint() {
    return useSetAtom(selectedPointAtom);
}