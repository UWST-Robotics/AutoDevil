import {Box, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import AutoStepsListItemContainer from "./AutoStepsListItemContainer.tsx";
import useSelectedAutoStepID from "../../hooks/AutoSteps/selected/useSelectedAutoStepID.ts";
import GUID from "../../types/GUID.ts";
import useAutoStep from "../../hooks/AutoSteps/useAutoStep.ts";
import getAutoStepType from "../../utils/getAutoStepType.ts";

export interface AutoStepsListItemProps {
    autoStepID: GUID;
}

export default function AutoStepsListItem(props: AutoStepsListItemProps) {
    // Hooks
    const [selectedAutoStepID, setSelectedAutoStepID] = useSelectedAutoStepID();
    const [autoStep] = useAutoStep(props.autoStepID);
    const autoStepType = getAutoStepType(autoStep);

    // Functions
    const selectThisStep = () => setSelectedAutoStepID(props.autoStepID);

    // State
    const isSelected = selectedAutoStepID === props.autoStepID;

    if (!autoStep)
        throw new Error(`AutoStep with ID ${props.autoStepID} not found`);
    if (!autoStepType)
        throw new Error(`AutoStepType with ID ${autoStep.typeID} not found`);

    return (
        <Box
            onDragStart={e => {
                // Disable default drag image
                e.dataTransfer.setDragImage(new Image(), 0, 0);
            }}
        >
            <AutoStepsListItemContainer
                disablePadding
                color={autoStepType.color}
                backgroundColor={autoStepType.backgroundColor ?? autoStepType.color}
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
                        <autoStepType.icon/>
                    </ListItemIcon>
                    <ListItemText
                        primary={autoStepType.name}
                    />
                </ListItemButton>
            </AutoStepsListItemContainer>
        </Box>
    )
}