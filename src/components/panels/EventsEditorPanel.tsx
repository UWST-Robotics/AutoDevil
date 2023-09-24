import { Button, Icon } from "@blueprintjs/core";
import React from "react";
import DropdownList from "../util/DropdownList.tsx";
import { useSelectedPointValue } from "../../hooks/Point/useSelectPoint.ts";
import { usePathPoint } from "../../hooks/Point/usePathPoint.ts";
import generateGUID, { DEFAULT_GUID } from "../../utils/generateGUID.ts";
import GUID from "../../types/GUID.ts";
import EventEditorPanel from "./EventEditorPanel.tsx";
import PathEvent from "../../types/PathEvent.ts";

export default function EventsEditorPanel() {
    const [selectedEventID, setSelectedEventID] = React.useState<GUID | undefined>(undefined);
    const selectedPointID = useSelectedPointValue();
    const [point, setPoint] = usePathPoint(selectedPointID ?? DEFAULT_GUID);

    const addEvent = React.useCallback(() => {
        if (!point)
            return;
        const newEvent: PathEvent = {
            id: generateGUID(),
            name: "pause",
            params: ""
        };
        setPoint({
            ...point,
            events: [
                ...(point?.events ?? []),
                newEvent
            ]
        });
    }, [point, setPoint]);

    return (
        <>
            <h3
                style={{
                    marginBottom: 10
                }}
            >
                <Icon
                    icon={"antenna"}
                    style={{
                        marginRight: 7,
                        marginBottom: 2
                    }}
                />
                Events
            </h3>
            <Button
                alignText="left"
                minimal
                fill
                icon="add"
                text={"Add Event"}
                onClick={addEvent}
                style={{ marginBottom: 0 }}
            />
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

        </>
    )
}