import {atom, useSetAtom} from "jotai";

// Atoms
export const rotateAutoStepsAtom = atom(null, (_get, _set, _clockwise: boolean) => {
    throw new Error("Not implemented yet");
});

// Hooks
export default function useRotateAutoSteps() {
    return useSetAtom(rotateAutoStepsAtom);
}