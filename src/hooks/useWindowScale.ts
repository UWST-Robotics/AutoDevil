import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

export const windowScaleAtom = atom(1);

export function useWindowScale() {
    return useAtom(windowScaleAtom);
}

export function useSetWindowScale() {
    return useSetAtom(windowScaleAtom);
}

export default function useWindowScaleValue() {
    return useAtomValue(windowScaleAtom);
}