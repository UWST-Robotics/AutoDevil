import AutoStep from "../AutoStep.ts";
import {Route} from "@mui/icons-material";
import AutoStepType from "../AutoStepType.ts";
import generateGUID from "../../../utils/generateGUID.ts";

export interface RotateToStep extends AutoStep {
    heading: number;
}

const RotateToStepType: AutoStepType<RotateToStep> = {
    id: "rotateTo",
    name: "Rotate To",
    
    color: "primary.main",
    backgroundColor: "#19333d",
    icon: Route,

    createNew: () => {
        return {
            id: generateGUID(),
            typeID: RotateToStepType.id,
            heading: 0
        };
    },
    getPose: (step, prevPose) => {
        return {...prevPose, r: step.heading};
    },
    generateCode: (step) => {
        return [
            `autoBuilder.rotateTo(${step.heading});`
        ];
    }
}
export default RotateToStepType;