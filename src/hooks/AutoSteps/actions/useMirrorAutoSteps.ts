import {atom, useSetAtom} from "jotai";

// Atoms
export const mirrorAutoStepsAtom = atom(null, (_get, _set, _vertical: boolean) => {
    throw new Error("Not implemented yet");
});

// Hooks
export default function useMirrorAutoSteps() {
    return useSetAtom(mirrorAutoStepsAtom);
}