import Pose from "../Pose.ts";
import AutoStep from "./AutoStep.ts";
import {Route} from "@mui/icons-material";
import AutoStepType from "./AutoStepType.ts";

export const RotateToStepType: AutoStepType = {
    id: "rotateTo",
    name: "Rotate To",
    color: "#4caf50",
    icon: Route,
    createNew: () => new RotateToStep()
}

class RotateToStep extends AutoStep {
    type = RotateToStepType;
    heading: number = 0;

    getPose(prevPose: Pose): Pose | undefined {
        return {...prevPose, r: this.heading};
    }

    generateCode(): string[] {
        return [
            `autoBuilder.rotateTo(${this.heading});`
        ];
    }
}
export default RotateToStep;