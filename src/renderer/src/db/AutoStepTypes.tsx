import AutoStepType from "../types/AutoSteps/AutoStepType.ts";
import AutoDriveStep from "../types/AutoSteps/AutoDriveStep.ts";
import AutoRotateStep from "../types/AutoSteps/AutoRotateStep.ts";
import AutoPoseStep from "../types/AutoSteps/AutoPoseStep.ts";
import {ArrowForward, PinDrop, PlayArrow, RotateRight, Stop} from "@mui/icons-material";
import AutoStepInfo from "../types/AutoSteps/AutoStepInfo.ts";
import generateGUID from "../utils/generateGUID.ts";
import AutoInitialStep from "../types/AutoSteps/AutoInitialStep.ts";
import AutoStep from "../types/AutoSteps/AutoStep.ts";

const AutoStepTypes: AutoStepInfo[] = [
    {
        isHidden: true,
        icon: <PlayArrow/>,
        name: "Start Pose",
        type: AutoStepType.START,
        create: () => {
            const step: AutoInitialStep = {
                id: generateGUID(),
                type: AutoStepType.START,
                pose: {x: 0, y: 0, r: 0}
            };
            return step;
        }
    },
    {
        icon: <ArrowForward/>,
        name: "Drive",
        type: AutoStepType.DRIVE,
        create: () => {
            const step: AutoDriveStep = {
                id: generateGUID(),
                type: AutoStepType.DRIVE,
                distance: 0
            };
            return step;
        }
    },
    {
        icon: <RotateRight/>,
        name: "Rotate",
        type: AutoStepType.ROTATE,
        create: () => {
            const step: AutoRotateStep = {
                id: generateGUID(),
                type: AutoStepType.ROTATE,
                rotation: 0
            };
            return step;
        }
    },
    {
        icon: <PinDrop/>,
        name: "Go to Pose",
        type: AutoStepType.GOTO,
        create: () => {
            const step: AutoPoseStep = {
                id: generateGUID(),
                type: AutoStepType.GOTO,
                pose: {x: 0, y: 0, r: 0},
                initialOffset: 6,
                exitOffset: 6
            };
            return step;
        }
    },
    {
        icon: <Stop/>,
        name: "Stop",
        type: AutoStepType.STOP,
        create: () => {
            const step: AutoStep = {
                id: generateGUID(),
                type: AutoStepType.STOP
            };
            return step;
        }
    }
];

export default AutoStepTypes;