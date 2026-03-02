import {Rotate90DegreesCw} from "@mui/icons-material";
import AutoStepType from "../AutoStepType.ts";
import numberToString from "../../../utils/toString.ts";
import {DEFAULT_POSE} from "../../Pose.ts";

const RotateToStepType: AutoStepType = {
    id: "rotateTo",
    name: "Rotate To",

    color: "primary.main",
    backgroundColor: "#19333d",
    icon: Rotate90DegreesCw,

    getPose: (step, prevPose) => {
        return {...prevPose, r: step.pose?.r ?? DEFAULT_POSE.r};
    },
    generateCode: (step) => {
        return [
            `autoBuilder.rotateTo(${numberToString(step.pose?.r ?? DEFAULT_POSE.r)})->startSync();`
        ];
    }
}
export default RotateToStepType;