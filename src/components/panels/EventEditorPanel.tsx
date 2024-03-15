import GUID from "../../types/GUID";
import { useSelectedPointValue } from "../../hooks/Point/useSelectPoint.ts";
import { usePathPoint } from "../../hooks/Point/usePathPoint.ts";
import { DEFAULT_GUID } from "../../utils/generateGUID.ts";
import React from "react";
import makeAlphanumeric from "../../utils/makeAlphanumeric.ts";
import { Autocomplete, IconButton, ListItem, TextField } from "@mui/material";
import useRawPathValue from "../../hooks/Path/useRawPath.ts";
import RemoveIcon from "@mui/icons-material/Remove";

interface EventEditorPanelProps {
    eventID: GUID;
}

export default function EventEditorPanel(props: EventEditorPanelProps) {
    const selectedPointID = useSelectedPointValue();
    const [point, setPoint] = usePathPoint(selectedPointID ?? DEFAULT_GUID);
    const event = point?.events?.find(e => e.id === props.eventID);
    const rawPath = useRawPathValue();

    const eventNames = React.useMemo(() => {
        const names = new Set<string>();
        rawPath?.points.forEach(p => {
            p.events?.forEach(e => {
                names.add(e.name);
            });
        });
        return Array.from(names);
    }, [rawPath]);

    const onAutoCompleteChange = React.useCallback((_: any, value: string | null) => {
        if (!point || !event || !point.events)
            return;

        // Apply to Event
        const eventIndex = point.events.findIndex(e => e.id === props.eventID);
        point.events[eventIndex] = {
            ...event,
            name: value ?? ""
        };

        const newPoint = {
            ...point,
            events: [
                ...point.events
            ]
        };
        setPoint(newPoint);
    }, [point, setPoint, props.eventID, event]);

    const onNameChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!point || !event || !point.events)
            return;

        // Apply to Event
        const eventIndex = point.events.findIndex(e => e.id === props.eventID);
        point.events[eventIndex] = {
            ...event,
            name: makeAlphanumeric(e.target.value, "\\._-")
        };

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
    }, [point, setPoint, props.eventID, event]);

    return (
        <ListItem disablePadding>
            <Autocomplete
                fullWidth
                options={eventNames}
                size={"small"}
                autoHighlight
                value={event?.name}
                onChange={onAutoCompleteChange}
                disableClearable
                renderInput={(params) => (
                    <TextField
                        {...params}
                        fullWidth
                        onChange={onNameChange}
                        label={"Name"}
                        variant={"standard"}
                    />
                )}
            />
            <TextField
                value={event?.params}
                onChange={onParamsChange}
                size={"small"}
                label={"Parameters"}
                style={{ margin: 4 }}
                variant={"standard"}
            />
            <IconButton
                onClick={onDelete}
                size={"small"}
            >
                <RemoveIcon />
            </IconButton>
        </ListItem>
    )
}