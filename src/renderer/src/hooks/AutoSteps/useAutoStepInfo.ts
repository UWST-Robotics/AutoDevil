import {atomFamily} from "jotai/utils";
import AutoStepType from "../../types/AutoSteps/AutoStepType.ts";
import {atom, useAtomValue} from "jotai";
import AutoStepTypes from "../../db/AutoStepTypes.tsx";

// Atoms
export const autoStepInfoAtomFamily = atomFamily((type: AutoStepType) => atom(() => {
    return AutoStepTypes.find(t => t.type === type);
}));

// Hooks
export default function useAutoStepInfo(type?: AutoStepType) {
    return useAtomValue(autoStepInfoAtomFamily(type ?? AutoStepType.UNKNOWN));
}