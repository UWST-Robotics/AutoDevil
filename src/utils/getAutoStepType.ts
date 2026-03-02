import AutoStepTypes from "../db/AutoStepTypes.tsx";
import AutoStep from "../types/AutoSteps/AutoStep.ts";

/**
 * Finds the `AutoStepType` that corresponds to an `AutoStep`
 * @param autoStep - The `AutoStep` to find the type of
 * @returns The `AutoStepType` that corresponds to the `AutoStep`
 */
export default function getAutoStepType(autoStep: AutoStep | undefined) {
    return AutoStepTypes.find(t => t.id === autoStep?.typeID);
}