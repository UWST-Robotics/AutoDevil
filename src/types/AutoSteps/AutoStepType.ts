import {SvgIconComponent} from "@mui/icons-material";
import AutoStep from "./AutoStep.ts";
import Pose from "../Pose.ts";

interface AutoStepType {
    id: string;
    name: string;

    color: string;
    backgroundColor?: string;
    icon: SvgIconComponent;

    getPose?: (autoStep: AutoStep, prevPose: Pose) => Pose;
    generateCode: (autoStep: AutoStep) => string[];
}

export default AutoStepType;