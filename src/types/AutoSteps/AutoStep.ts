import GUID from "../GUID.ts";
import Pose from "../Pose.ts";

interface AutoStep {
    id: GUID;
    typeID: string;

    // Robot pose, used for `DriveToStep` and `JumpToStep`
    pose?: Pose;

    // Duration in milliseconds to pause for, used for `PauseStep`
    pauseDuration?: number;
}

export default AutoStep;