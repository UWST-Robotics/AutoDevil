import AutoStepType from "../AutoStepType.ts";
import generateGUID from "../../../utils/generateGUID.ts";
import AutoPoseStep from "../AutoPoseStep.ts";
import {LocationOn} from "@mui/icons-material";

const JumpToStepType: AutoStepType<AutoPoseStep> = {
    id: "jumpTo",
    name: "Jump To",

    color: "success.main",
    backgroundColor: "#193d1d",
    icon: LocationOn,

    createNew: () => {
        return {
            id: generateGUID(),
            typeID: JumpToStepType.id,
            x: 0,
            y: 0,
            r: 0
        };
    },
    getPose: (step) => step,
    generateCode: (step) => {
        return [
            `autoBuilder.jumpTo({${step.x}, ${step.y}, ${step.r}});`
        ];
    }
}
export default JumpToStepType;