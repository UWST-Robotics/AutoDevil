import AutoStepType from "./AutoStepType.ts";
import GUID from "../GUID.ts";
import Pose from "../Pose.ts";

export default interface AutoStep {
    id: GUID;
    type: AutoStepType;

    // Offsets
    distance?: number;
    rotation?: number;

    // Location
    pose?: Pose;

    // Spline
    enterOffset?: number;
    exitOffset?: number;
}