import AutoStep from "../AutoStep.ts";
import {Stop} from "@mui/icons-material";
import AutoStepType from "../AutoStepType.ts";

export interface PauseStep extends AutoStep {
    pauseDuration: number;
}

const PauseStepType: AutoStepType = {
    id: "pause",
    name: "Pause",

    color: "error.main",
    backgroundColor: "#3d1919",
    icon: Stop,

    generateCode: (step) => {
        return [
            `pros::delay(${step.pauseDuration ?? 1000});`
        ];
    }
}
export default PauseStepType;