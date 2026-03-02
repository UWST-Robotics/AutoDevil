import PanelContainer from "./PanelContainer.tsx";
import FlexNumericInput from "../common/input/FlexNumericInput.tsx";
import useSelectedAutoStep from "../../hooks/AutoSteps/selected/useSelectedAutoStep.ts";
import {InputAdornment} from "@mui/material";
import PauseStepType from "../../types/AutoSteps/AutoStepTypes/PauseStep.ts";

export default function PausePanel() {
    const [autoStep, setAutoStep] = useSelectedAutoStep();

    if (autoStep?.typeID !== PauseStepType.id || !autoStep)
        return null;
    return (
        <PanelContainer
            title={"Pause"}
        >
            <FlexNumericInput
                inputProps={{
                    label: "Pause Duration",
                    sx: {marginTop: 1},
                    fullWidth: true,
                    InputProps: {
                        endAdornment: (<InputAdornment position={"end"}>second(s)</InputAdornment>)
                    }
                }}
                value={autoStep.pauseDuration ?? 1}
                onChange={(pauseDuration) => setAutoStep({...autoStep, pauseDuration})}
            />
        </PanelContainer>
    );
}