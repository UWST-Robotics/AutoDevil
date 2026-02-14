import AutoStepTypes from "../db/AutoStepTypes.tsx";
import AutoStepType from "../types/AutoSteps/AutoStepType.ts";

export default function getAutoStepInfo(type: AutoStepType) {
    return AutoStepTypes.find(t => t.type === type);
}