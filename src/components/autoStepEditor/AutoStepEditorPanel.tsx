import {Box} from "@mui/material";
import GUID from "../../types/GUID.ts";
import useAutoStep from "../../hooks/AutoSteps/useAutoStep.ts";
import JumpToStepType from "../../types/AutoSteps/AutoStepTypes/JumpToStep.ts";
import DriveToStepType from "../../types/AutoSteps/AutoStepTypes/DriveToStepType.ts";
import PoseInput from "./PoseInput.tsx";
import AutoStepNumericInput from "./AutoStepNumericInput.tsx";
import RotateToStepType from "../../types/AutoSteps/AutoStepTypes/RotateToStep.ts";
import {DEFAULT_POSE} from "../../types/Pose.ts";

export interface AutoStepEditorPanelProps {
    id: GUID;
}

export default function AutoStepEditorPanel(props: AutoStepEditorPanelProps) {
    const [autoStep, setAutoStep] = useAutoStep(props.id);

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
            <AutoStepNumericInput
                id={props.id}
                prop={"heading"}
                label={"Rotation"}
                isVisible={autoStep.typeID === RotateToStepType.id}
                defaultValue={45}
            />
        </Box>
    )
}