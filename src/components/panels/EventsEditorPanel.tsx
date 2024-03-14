import React from "react";
import { useSelectedPointValue } from "../../hooks/Point/useSelectPoint.ts";
import { usePathPoint } from "../../hooks/Point/usePathPoint.ts";
import generateGUID, { DEFAULT_GUID } from "../../utils/generateGUID.ts";
import PathEvent from "../../types/PathEvent.ts";
import { Button, List } from "@mui/material";
import useSavePathHistory from "../../hooks/Utils/useUndoHistory.ts";
import PlusIcon from "@mui/icons-material/Add";
import EventEditorPanel from "./EventEditorPanel.tsx";

export default function EventsEditorPanel() {
    const selectedPointID = useSelectedPointValue();
    const [point, setPoint] = usePathPoint(selectedPointID ?? DEFAULT_GUID);
    const savePathHistory = useSavePathHistory();

    const addEvent = React.useCallback(() => {
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
    }, [point, setPoint]);

    return (
        <>
            <List>
                {point?.events?.map(event => (
                    <EventEditorPanel
                        key={event.id}
                        eventID={event.id}
                    />
                ))}
            </List>
            <Button
                fullWidth
                onClick={addEvent}
                size={"small"}
                color={"primary"}
                startIcon={<PlusIcon />}
            >
                Add Event
            </Button>
        </>
    )
}