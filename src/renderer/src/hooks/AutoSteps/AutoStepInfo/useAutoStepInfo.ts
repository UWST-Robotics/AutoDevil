import {atomFamily} from "jotai/utils";
import AutoStepType from "../../../types/AutoSteps/AutoStepType.ts";
import {atom, useAtomValue} from "jotai";
import getAutoStepInfo from "../../../utils/getAutoStepInfo.ts";

// Atoms
export const autoStepInfoAtomFamily = atomFamily((type: AutoStepType) => atom(() => {
    return getAutoStepInfo(type);
}));

// Hooks
export default function useAutoStepInfo(type?: AutoStepType) {
    return useAtomValue(autoStepInfoAtomFamily(type ?? AutoStepType.UNKNOWN));
}