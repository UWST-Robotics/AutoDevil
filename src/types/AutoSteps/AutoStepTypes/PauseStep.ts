import AutoStep from "../AutoStep.ts";
import {Stop} from "@mui/icons-material";
import AutoStepType from "../AutoStepType.ts";
import generateGUID from "../../../utils/generateGUID.ts";

export interface PauseStep extends AutoStep {
    pauseDuration: number;
}

const PauseStepType: AutoStepType<PauseStep> = {
    id: "pause",
    name: "Pause",

    color: "error.main",
    backgroundColor: "#3d1919",
    icon: Stop,

    createNew: () => {
        return {
            id: generateGUID(),
            typeID: PauseStepType.id,
            pauseDuration: 10000
        };
    },
    generateCode: (step) => {
        return [
            `pros::delay(${step.pauseDuration});`
        ];
    }
}
export default PauseStepType;