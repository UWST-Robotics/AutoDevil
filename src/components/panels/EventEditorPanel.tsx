import GUID from "../../types/GUID";
import { useSelectedPointValue } from "../../hooks/Point/useSelectPoint.ts";
import { usePathPoint } from "../../hooks/Point/usePathPoint.ts";
import { DEFAULT_GUID } from "../../utils/generateGUID.ts";
import React from "react";
import makeAlphanumeric from "../../utils/makeAlphanumeric.ts";
import { Button, ButtonGroup, TextField } from "@mui/material";
import CheckmarkIcon from "@mui/icons-material/Check";
import TrashIcon from "@mui/icons-material/Delete";

interface EventEditorPanelProps {
    eventID: GUID;
    onClose: () => void;
}

export default function EventEditorPanel(props: EventEditorPanelProps) {
    const selectedPointID = useSelectedPointValue();
    const [point, setPoint] = usePathPoint(selectedPointID ?? DEFAULT_GUID);
    const event = point?.events?.find(e => e.id === props.eventID);

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
        props.onClose();
    }, [point, setPoint, props.onClose, props.eventID, event]);

    return (
        <div style={{ marginLeft: 10, marginRight: 10 }}>
            <TextField
                fullWidth
                value={event?.name}
                onChange={onNameChange}
                size={"small"}
                label={"Name"}
                style={{ margin: 4 }}
            />
            <TextField
                fullWidth
                value={event?.params}
                onChange={onParamsChange}
                size={"small"}
                label={"Parameters"}
                style={{ margin: 4 }}
            />
            <ButtonGroup fullWidth style={{ margin: 4 }}>
                <Button
                    color={"success"}
                    onClick={props.onClose}
                >
                    <CheckmarkIcon />
                </Button>
                <Button
                    color={"error"}
                    onClick={onDelete}
                >
                    <TrashIcon />
                </Button>
            </ButtonGroup>
        </div>
    )
}