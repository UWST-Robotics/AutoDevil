import Pose from "../Pose.ts";
import AutoStep from "./AutoStep.ts";
import {Route} from "@mui/icons-material";
import AutoStepType from "./AutoStepType.ts";

export const DriveToStepType: AutoStepType = {
    id: "driveTo",
    name: "Drive To",
    color: "#4caf50",
    icon: Route,
    createNew: () => new DriveToStep()
}

class DriveToStep extends AutoStep {
    type = DriveToStepType;
    pose: Pose = {x: 0, y: 0, r: 0};

    getPose(): Pose {
        return this.pose;
    }

    generateCode(): string[] {
        return [
            `autoBuilder.driveTo({${this.pose.x}, ${this.pose.y}, ${this.pose.r}});`
        ];
    }
}
export default DriveToStep;