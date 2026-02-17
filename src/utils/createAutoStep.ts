import AutoStep from "../types/AutoSteps/AutoStep.ts";
import AutoStepType from "../types/AutoSteps/AutoStepType.ts";
import generateGUID from "./generateGUID.ts";

/**
 * Creates a new AutoStep of the given type with a unique ID.
 * @param type - The type of AutoStep to create.
 * @returns A new AutoStep object with a unique ID and the specified type.
 */
export default function createAutoStep(type: AutoStepType): AutoStep {
    return {
        id: generateGUID(),
        typeID: type.id
    };
}