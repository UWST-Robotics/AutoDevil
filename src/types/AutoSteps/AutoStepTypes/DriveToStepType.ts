import {Route} from "@mui/icons-material";
import AutoStepType from "../AutoStepType.ts";
import generateGUID from "../../../utils/generateGUID.ts";
import AutoPoseStep from "../AutoPoseStep.ts";

export const DriveToStepType: AutoStepType<AutoPoseStep> = {
    id: "driveTo",
    name: "Drive To",
    
    color: "primary.main",
    backgroundColor: "#19333d",
    icon: Route,

    createNew: () => {
        return {
            id: generateGUID(),
            typeID: DriveToStepType.id,
            x: 0,
            y: 0,
            r: 0
        };
    },
    getPose: (step) => step,
    generateCode: (step) => {
        return [
            `autoBuilder.driveTo({${step.x}, ${step.y}, ${step.r}});`
        ];
    }
}
export default DriveToStepType;