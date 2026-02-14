import AutoStep from "./AutoStep.ts";
import {Stop} from "@mui/icons-material";
import Pose from "../Pose.ts";
import AutoStepType from "./AutoStepType.ts";

export const PauseStepType: AutoStepType = {
    id: "pause",
    name: "Pause",
    color: "#4caf50",
    icon: Stop,
    createNew: () => new PauseStep()
}

class PauseStep extends AutoStep {
    type = PauseStepType;
    pauseDuration = 1000;

    getPose(): Pose | undefined {
        return undefined;
    }

    generateCode(): string[] {
        return [
            `pros::delay(${this.pauseDuration});`
        ];
    }
}
export default PauseStep;