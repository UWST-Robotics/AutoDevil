import { atom, useAtomValue } from "jotai";
import { scopeAtom } from "./useScope.ts";
import { pathAtom } from "../Path/usePath.ts";
import Scope from "../../types/Scope.ts";

export const scopeIndicesAtom = atom<Scope>((get) => {
    const scope = get(scopeAtom);
    const path = get(pathAtom);

    const start = Math.floor(scope.start * path.points.length);
    const end = Math.floor(scope.end * path.points.length);

    return { start, end };
});

export default function useScopeIndices() {
    return useAtomValue(scopeIndicesAtom);
}