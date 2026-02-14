import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import Scope from "../../types/Scope.ts";

export const scopeAtom = atom<Scope>({
    start: 0,
    end: 1
});

export default function useScope() {
    return useAtom(scopeAtom);
}

export function useScopeValue() {
    return useAtomValue(scopeAtom);
}

export function useSetScope() {
    return useSetAtom(scopeAtom);
}