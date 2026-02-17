import {Route} from "@mui/icons-material";
import AutoStepType from "../AutoStepType.ts";
import {DEFAULT_POSE} from "../../Pose.ts";
import {poseToString} from "../../../utils/toString.ts";

export const DriveToStepType: AutoStepType = {
    id: "driveTo",
    name: "Drive To",

    pathType: "spline",
    color: "primary.main",
    backgroundColor: "#19333d",
    icon: Route,

    getPose: (step) => step.pose ?? DEFAULT_POSE,
    generateCode: (step) => {
        const pose = step.pose ?? DEFAULT_POSE;
        return [
            `autoBuilder.driveTo(${poseToString(pose)})->startSync();`
        ];
    }
}
export default DriveToStepType;