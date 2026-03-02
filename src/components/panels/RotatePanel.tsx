import PanelContainer from "./PanelContainer.tsx";
import FlexNumericInput from "../common/input/FlexNumericInput.tsx";
import useSelectedAutoStep from "../../hooks/AutoSteps/selected/useSelectedAutoStep.ts";
import {InputAdornment} from "@mui/material";
import {DEFAULT_POSE} from "../../types/Pose.ts";
import RotateToStepType from "../../types/AutoSteps/AutoStepTypes/RotateToStep.ts";

export default function RotatePanel() {
    const [autoStep, setAutoStep] = useSelectedAutoStep();

    const rotation = autoStep?.pose?.r ?? DEFAULT_POSE.r;
    const setRotation = (r: number) => {
        if (autoStep)
            setAutoStep({
                ...autoStep, pose: {
                    ...DEFAULT_POSE,
                    ...autoStep.pose,
                    r
                }
            });
    }

    if (autoStep?.typeID !== RotateToStepType.id || !autoStep)
        return null;
    return (
        <PanelContainer
            title={"Rotate"}
        >
            <FlexNumericInput
                inputProps={{
                    label: "Rotation",
                    sx: {marginTop: 1},
                    fullWidth: true,
                    InputProps: {
                        endAdornment: (<InputAdornment position={"end"}>deg(s)</InputAdornment>)
                    }
                }}
                value={rotation}
                onChange={setRotation}
            />
        </PanelContainer>
    );
}