import React from "react";
import DropdownList from "../util/DropdownList.tsx";
import { useSelectedPointValue } from "../../hooks/Point/useSelectPoint.ts";
import { usePathPoint } from "../../hooks/Point/usePathPoint.ts";
import generateGUID, { DEFAULT_GUID } from "../../utils/generateGUID.ts";
import GUID from "../../types/GUID.ts";
import EventEditorPanel from "./EventEditorPanel.tsx";
import PathEvent from "../../types/PathEvent.ts";
import { Button } from "@mui/material";
import useSavePathHistory from "../../hooks/Utils/useUndoHistory.ts";
import PlusIcon from "@mui/icons-material/Add";

export default function EventsEditorPanel() {
    const [selectedEventID, setSelectedEventID] = React.useState<GUID | undefined>(undefined);
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
            <DropdownList
                elements={point?.events?.map((event) => ({
                    id: event.id,
                    name: event.name,
                    icon: "antenna",
                    intent: "success"
                })) ?? []}
                selectedID={selectedEventID}
                onSelectID={setSelectedEventID}
                renderElement={(element) => (
                    <EventEditorPanel
                        key={element.id}
                        eventID={element.id}
                        onClose={() => setSelectedEventID(undefined)}
                    />
                )}
            />
            <Button
                fullWidth
                onClick={addEvent}
                size={"small"}
                startIcon={<PlusIcon />}
            >
                Add Event
            </Button>
        </>
    )
}