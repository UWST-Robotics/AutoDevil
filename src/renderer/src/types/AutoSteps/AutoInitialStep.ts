import AutoStep from "./AutoStep.ts";
import Pose from "../Pose.ts";

export default interface AutoInitialStep extends AutoStep {
    pose: Pose;
}