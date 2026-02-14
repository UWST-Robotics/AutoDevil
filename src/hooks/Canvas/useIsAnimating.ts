import { atom, useAtom } from "jotai";

export const isAnimatingAtom = atom(false);

export default function useIsAnimating() {
    return useAtom(isAnimatingAtom);
}