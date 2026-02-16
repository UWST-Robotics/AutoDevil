import PanelContainer from "./PanelContainer.tsx";
import InputGroup from "../common/input/InputGroup.tsx";
import FlexNumericInput from "../common/input/FlexNumericInput.tsx";
import useSelectedAutoStep from "../../hooks/AutoSteps/selected/useSelectedAutoStep.ts";
import DriveToStepType from "../../types/AutoSteps/AutoStepTypes/DriveToStepType.ts";
import JumpToStepType from "../../types/AutoSteps/AutoStepTypes/JumpToStep.ts";
import Pose, {DEFAULT_POSE} from "../../types/Pose.ts";
import {InputAdornment} from "@mui/material";

export default function TransformPanel() {
    const [autoStep, setAutoStep] = useSelectedAutoStep();

    // Pose Utils
    const pose = autoStep?.pose ?? DEFAULT_POSE;
    const setPose = (pose: Pose) => {
        if (autoStep)
            setAutoStep({...autoStep, pose});
    }

    // Check if Pose is Editable
    const isPoseEditable =
        autoStep?.typeID === DriveToStepType.id ||
        autoStep?.typeID === JumpToStepType.id;
    if (!isPoseEditable || !autoStep)
        return null;

    return (
        <PanelContainer
            title={"Transform"}
        >
            <InputGroup>
                <FlexNumericInput
                    inputProps={{
                        label: "X",
                        variant: "outlined",
                        sx: {marginTop: 1},
                        InputProps: {
                            endAdornment: (<InputAdornment position={"end"}>in</InputAdornment>)
                        }
                    }}
                    value={pose.x}
                    onChange={(x) => setPose({...pose, x})}
                />
                <FlexNumericInput
                    inputProps={{
                        label: "Y",
                        variant: "outlined",
                        sx: {marginTop: 1},
                        InputProps: {
                            endAdornment: (<InputAdornment position={"end"}>in</InputAdornment>)
                        }
                    }}
                    value={pose.y}
                    onChange={(y) => setPose({...pose, y})}
                />
            </InputGroup>
            <InputGroup>
                <FlexNumericInput
                    inputProps={{
                        label: "Rotation",
                        sx: {marginTop: 1},
                        fullWidth: true,
                        InputProps: {
                            endAdornment: (<InputAdornment position={"end"}>deg</InputAdornment>)
                        }
                    }}
                    value={pose.r}
                    onChange={(r) => setPose({...pose, r})}
                />
            </InputGroup>
        </PanelContainer>
    );
}