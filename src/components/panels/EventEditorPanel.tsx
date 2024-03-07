import GUID from "../../types/GUID";
import { Button, MenuItem, TextArea } from "@blueprintjs/core";
import { useSelectedPointValue } from "../../hooks/Point/useSelectPoint.ts";
import { usePathPoint } from "../../hooks/Point/usePathPoint.ts";
import { DEFAULT_GUID } from "../../utils/generateGUID.ts";
import React from "react";
import { Suggest } from "@blueprintjs/select";
import useRawPathValue from "../../hooks/Path/useRawPath.ts";
import makeAlphanumeric from "../../utils/makeAlphanumeric.ts";

interface EventEditorPanelProps {
    eventID: GUID;
    onClose: () => void;
}

export default function EventEditorPanel(props: EventEditorPanelProps) {
    const path = useRawPathValue();
    const selectedPointID = useSelectedPointValue();
    const [point, setPoint] = usePathPoint(selectedPointID ?? DEFAULT_GUID);
    const event = point?.events?.find(e => e.id === props.eventID);

    const eventList = React.useMemo(() => {
        if (!path || !point || !point.events)
            return [];
        return path.points.map(p => p.events?.map(e => e.name)).flat().filter((v, i, a) => a.indexOf(v) === i && v !== undefined) as string[];
    }, [path, point]);

    const onNameChange = React.useCallback((name: string) => {
        if (!point || !event || !point.events)
            return;
        const eventIndex = point.events.findIndex(e => e.id === props.eventID);
        point.events[eventIndex] = { ...event, name: makeAlphanumeric(name, "\\._-") };

        const newPoint = {
            ...point,
            events: [
                ...point.events
            ]
        };
        setPoint(newPoint);
    }, [point, setPoint, props.eventID, event]);

    const onParamsChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!point?.events || !event)
            return;

        // Apply to Event
        const eventIndex = point.events.findIndex(e => e.id === props.eventID);
        point.events[eventIndex] = {
            ...event,
            params: makeAlphanumeric(e.target.value, " \\._-")
        };

        // Apply to Point
        const newPoint = {
            ...point,
            events: [
                ...point.events
            ]
        };
        setPoint(newPoint);
    }, [point, setPoint, props.eventID, event]);

    const onDelete = React.useCallback(() => {
        if (!point || !event || !point.events)
            return;
        const eventIndex = point.events.findIndex(e => e.id === props.eventID);
        point.events.splice(eventIndex, 1);

        const newPoint = {
            ...point,
            events: [
                ...point.events
            ]
        };
        setPoint(newPoint);
        props.onClose();
    }, [point, setPoint, props.onClose, props.eventID, event]);

    return (
        <div style={{ padding: 20 }}>
            <Suggest
                query={event?.name ?? ""}
                fill
                items={eventList}
                inputValueRenderer={(item) => item}
                itemPredicate={(query, item) => item.toLowerCase().indexOf(query.toLowerCase()) >= 0}
                itemRenderer={(item, { handleClick, modifiers }) => (
                    <MenuItem
                        key={item}
                        text={item}
                        active={modifiers.active}
                        onClick={handleClick}
                    />
                )}
                onQueryChange={onNameChange}
                onItemSelect={onNameChange}
                selectedItem={event?.name ?? ""}
            />
            <TextArea
                fill
                value={event?.params}
                onChange={onParamsChange}
                placeholder={"Parameters"}
            />
            <Button
                icon={"tick"}
                intent={"success"}
                onClick={props.onClose}
                style={{ margin: 2 }}
            />
            <Button
                icon={"trash"}
                intent={"danger"}
                onClick={onDelete}
                style={{ margin: 2 }}
            />
        </div>
    )
}