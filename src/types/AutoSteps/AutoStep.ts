import GUID from "../GUID.ts";
import Pose from "../Pose.ts";

interface AutoStep {
    id: GUID;
    typeID: string;

    // Robot pose, used for `DriveToStep` and `JumpToStep`
    pose?: Pose;

    // Heading in degrees, used for `RotateToStep`
    heading?: number;

    // Duration in milliseconds to pause for, used for `PauseStep`
    pauseDuration?: number;
}

export default AutoStep;