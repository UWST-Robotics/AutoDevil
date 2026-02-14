import Pose from "../Pose.ts";
import AutoStep from "./AutoStep.ts";
import {PlayArrow} from "@mui/icons-material";
import AutoStepType from "./AutoStepType.ts";

export const InitialStepType: AutoStepType = {
    id: "initialStep",
    name: "Start",
    color: "#2196f3",
    icon: PlayArrow,
    createNew: () => new InitialStep()
}

class InitialStep extends AutoStep {
    type = InitialStepType;
    pose: Pose = {x: 0, y: 0, r: 0};

    getPose(): Pose {
        return this.pose;
    }

    generateCode(): string[] {
        return [
            `const auto autoBuilder = new AutoBuilder();`,
            `autoBuilder.jumpTo({${this.pose.x}, ${this.pose.y}, ${this.pose.r}});`
        ];
    }
}

export default InitialStep;