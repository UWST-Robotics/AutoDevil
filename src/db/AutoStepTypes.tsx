import PauseStepType from "../types/AutoSteps/AutoStepTypes/PauseStep.ts";
import DriveToStepType from "../types/AutoSteps/AutoStepTypes/DriveToStepType.ts";
import RotateToStepType from "../types/AutoSteps/AutoStepTypes/RotateToStep.ts";
import JumpToStepType from "../types/AutoSteps/AutoStepTypes/JumpToStep.ts";
import AutoStepType from "../types/AutoSteps/AutoStepType.ts";

const AutoStepTypes: AutoStepType<any>[] = [
    JumpToStepType,
    DriveToStepType,
    PauseStepType,
    RotateToStepType
];

export default AutoStepTypes;