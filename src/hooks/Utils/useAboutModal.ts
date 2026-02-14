import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

export const showAboutAtom = atom(false);

export function useShowAbout() {
    return useAtom(showAboutAtom);
}

export function useSetShowAbout() {
    return useSetAtom(showAboutAtom);
}

export function useGetShowAbout() {
    return useAtomValue(showAboutAtom);
}