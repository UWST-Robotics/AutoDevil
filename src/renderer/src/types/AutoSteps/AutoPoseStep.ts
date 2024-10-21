import AutoStep from "./AutoStep.ts";
import Pose from "../Pose.ts";

export default interface AutoPoseStep extends AutoStep {
    pose: Pose;
    initialOffset: number;
    exitOffset: number;
}