import React from "react";
import { IconButton } from "@mui/material";
import PathEvent from "../../types/PathEvent.ts";
import generateGUID, { DEFAULT_GUID } from "../../utils/generateGUID.ts";
import { useSelectedPointValue } from "../../hooks/Point/useSelectPoint.ts";
import { usePathPoint } from "../../hooks/Point/usePathPoint.ts";
import useSavePathHistory from "../../hooks/Utils/useUndoHistory.ts";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

export default function AddEventButton() {
    const selectedPointID = useSelectedPointValue();
    const [point, setPoint] = usePathPoint(selectedPointID ?? DEFAULT_GUID);
    const savePathHistory = useSavePathHistory();

    const onClick = React.useCallback(() => {
        if (!point)
            return;
        const newEvent: PathEvent = {
            id: generateGUID(),
            name: "newEvent",
            params: ""
        };
        setPoint({
            ...point,
            events: [
                ...(point?.events ?? []),
                newEvent
            ]
        });
        savePathHistory();
    }, [point, setPoint, savePathHistory]);

    return (
        <IconButton
            aria-label={"Add Event"}
            onClick={onClick}
        >
            <PlaylistAddIcon />
        </IconButton>
    )
}