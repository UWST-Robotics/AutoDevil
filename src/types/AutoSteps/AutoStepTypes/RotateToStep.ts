import {Rotate90DegreesCw} from "@mui/icons-material";
import AutoStepType from "../AutoStepType.ts";

const RotateToStepType: AutoStepType = {
    id: "rotateTo",
    name: "Rotate To",

    color: "primary.main",
    backgroundColor: "#19333d",
    icon: Rotate90DegreesCw,

    getPose: (step, prevPose) => {
        return {...prevPose, r: step.heading ?? 0};
    },
    generateCode: (step) => {
        return [
            `autoBuilder.rotateTo(${step.heading ?? 0});`
        ];
    }
}
export default RotateToStepType;