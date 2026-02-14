import {SvgIconComponent} from "@mui/icons-material";
import AutoStep from "./AutoStep.ts";
import Pose from "../Pose.ts";

interface AutoStepType<T extends AutoStep> {
    id: string;
    name: string;

    color: string;
    backgroundColor?: string;
    icon: SvgIconComponent;

    createNew: () => T;
    getPose?: (autoStep: T, prevPose: Pose) => Pose;
    generateCode: (autoStep: T) => string[];
}

export default AutoStepType;