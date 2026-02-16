import {Box} from "@mui/material";
import JumpToStepType from "../../types/AutoSteps/AutoStepTypes/JumpToStep.ts";
import DriveToStepType from "../../types/AutoSteps/AutoStepTypes/DriveToStepType.ts";
import PoseInput from "../common/PoseInput.tsx";
import {DEFAULT_POSE} from "../../types/Pose.ts";
import useSelectedAutoStep from "../../hooks/AutoSteps/selected/useSelectedAutoStep.ts";

export default function AutoStepEditorPanel() {
    const [autoStep, setAutoStep] = useSelectedAutoStep();

    const isPoseEditable =
        autoStep?.typeID === DriveToStepType.id ||
        autoStep?.typeID === JumpToStepType.id;

    if (!autoStep)
        return null;
    return (
        <Box sx={{padding: 1}}>
            {isPoseEditable && (
                <PoseInput
                    pose={autoStep.pose ?? DEFAULT_POSE}
                    onChange={(pose) => setAutoStep({...autoStep, pose})}
                />
            )}
        </Box>
    )
}