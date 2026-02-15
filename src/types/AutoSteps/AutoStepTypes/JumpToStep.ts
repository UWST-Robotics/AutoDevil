import AutoStepType from "../AutoStepType.ts";
import {LocationOn} from "@mui/icons-material";
import {DEFAULT_POSE} from "../../Pose.ts";

const JumpToStepType: AutoStepType = {
    id: "jumpTo",
    name: "Jump To",

    color: "success.main",
    backgroundColor: "#193d1d",
    icon: LocationOn,

    getPose: (step) => step.pose ?? DEFAULT_POSE,
    generateCode: (step) => {
        const pose = step.pose ?? DEFAULT_POSE;
        return [
            `autoBuilder.jumpTo({${pose.x}, ${pose.y}, ${pose.r}});`
        ];
    }
}
export default JumpToStepType;