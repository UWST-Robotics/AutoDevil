import PauseStepType from "../types/AutoSteps/AutoStepTypes/PauseStep.ts";
import DriveToStepType from "../types/AutoSteps/AutoStepTypes/DriveToStepType.ts";
import RotateToStepType from "../types/AutoSteps/AutoStepTypes/RotateToStep.ts";
import JumpToStepType from "../types/AutoSteps/AutoStepTypes/JumpToStep.ts";
import AutoStepType from "../types/AutoSteps/AutoStepType.ts";
import CustomCodeStepType from "../types/AutoSteps/AutoStepTypes/CustomStep.ts";

const AutoStepTypes: AutoStepType[] = [
    JumpToStepType,
    DriveToStepType,
    RotateToStepType,
    PauseStepType,
    CustomCodeStepType,
];

export default AutoStepTypes;