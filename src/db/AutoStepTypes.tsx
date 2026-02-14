import AutoStepInfo from "../types/AutoSteps/AutoStepType.ts";
import {DriveToStepType} from "../types/AutoSteps/DriveToStep.ts";
import {PauseStepType} from "../types/AutoSteps/PauseStep.ts";
import {RotateToStepType} from "../types/AutoSteps/RotateToStep.ts";

const AutoStepTypes: AutoStepInfo[] = [
    DriveToStepType,
    PauseStepType,
    RotateToStepType
];

export default AutoStepTypes;