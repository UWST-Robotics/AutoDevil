import {Stop} from "@mui/icons-material";
import AutoStepType from "../AutoStepType.ts";

const PauseStepType: AutoStepType = {
    id: "pause",
    name: "Pause",

    color: "error.main",
    backgroundColor: "#3d1919",
    icon: Stop,

    generateCode: (step) => {
        const delayMS = Math.round((step.pauseDuration ?? 1) * 1000);
        return [
            `pros::delay(${delayMS});`
        ];
    }
}
export default PauseStepType;