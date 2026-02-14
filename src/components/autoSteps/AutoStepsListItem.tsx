import {Box, Collapse, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import AutoStepsListItemContainer from "./AutoStepsListItemContainer.tsx";
import useSelectedAutoStepID from "../../hooks/AutoSteps/selected/useSelectedAutoStepID.ts";
import GUID from "../../types/GUID.ts";
import useAutoStep from "../../hooks/AutoSteps/useAutoStep.ts";
import AutoStepEditorPanel from "../autoStepEditor/AutoStepEditorPanel.tsx";

export interface AutoStepsListItemProps {
    autoStepID: GUID;
}

export default function AutoStepsListItem(props: AutoStepsListItemProps) {
    // Hooks
    const [selectedAutoStepID, setSelectedAutoStepID] = useSelectedAutoStepID();
    const [autoStep] = useAutoStep(props.autoStepID);

    // Functions
    const selectThisStep = () => setSelectedAutoStepID(props.autoStepID);

    // State
    const isSelected = selectedAutoStepID === props.autoStepID;

    if (!autoStep)
        return null;
    return (
        <Box>
            <AutoStepsListItemContainer
                disablePadding
                color={autoStep.type.color}
            >
                <ListItemButton
                    sx={{
                        borderRadius: 2
                    }}
                    dense
                    selected={isSelected}
                    onClick={selectThisStep}
                >
                    <ListItemIcon>
                        <autoStep.type.icon/>
                    </ListItemIcon>
                    <ListItemText
                        primary={autoStep.type.name}
                    />
                </ListItemButton>
            </AutoStepsListItemContainer>

            <Collapse in={isSelected}>
                <AutoStepEditorPanel
                    id={props.autoStepID}
                />
            </Collapse>
        </Box>
    )
}