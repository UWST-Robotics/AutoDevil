import PanelContainer from "./PanelContainer.tsx";
import useSelectedAutoStep from "../../hooks/AutoSteps/selected/useSelectedAutoStep.ts";
import {TextField} from "@mui/material";
import CustomCodeStepType, {DEFAULT_CUSTOM_CODE} from "../../types/AutoSteps/AutoStepTypes/CustomStep.ts";

export default function CustomCodePanel() {
    const [autoStep, setAutoStep] = useSelectedAutoStep();

    const customCode = autoStep?.customCode ?? DEFAULT_CUSTOM_CODE;
    const setCustomCode = (customCode: string) => {
        if (autoStep)
            setAutoStep({...autoStep, customCode});
    }

    if (autoStep?.typeID !== CustomCodeStepType.id || !autoStep)
        return null;
    return (
        <PanelContainer
            title={"Custom Code"}
        >
            <TextField
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                label={"Code Input"}
                variant={"outlined"}
                fullWidth
                size={"small"}
                multiline
                sx={{marginTop: 1}}
            />
        </PanelContainer>
    );
}