import generateGUID from "../../utils/generateGUID.ts";
import Pose from "../Pose.ts";
import AutoStepType from "./AutoStepType.ts";

abstract class AutoStep {
    id = generateGUID();

    abstract type: AutoStepType;

    /**
     * Gets the pose associated with this step, if any.
     * This is used for rendering the step on the field.
     * @param prevPose The pose of the previous step, which can be used as a reference for calculating the new pose.
     * @return The pose associated with this step, or undefined if this step does not have a pose.
     */
    abstract getPose(prevPose: Pose): Pose | undefined;

    /**
     * Generates the code for this step.
     * Each string in the returned array represents a line of code.
     * @return An array of strings representing the code for this step.
     */
    abstract generateCode(): string[];
}
export default AutoStep;