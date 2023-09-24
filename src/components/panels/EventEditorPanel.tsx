import GUID from "../../types/GUID";
import { MenuItem, TextArea } from "@blueprintjs/core";
import { useSelectedPointValue } from "../../hooks/Point/useSelectPoint.ts";
import { usePathPoint } from "../../hooks/Point/usePathPoint.ts";
import { DEFAULT_GUID } from "../../utils/generateGUID.ts";
import React from "react";
import { Suggest } from "@blueprintjs/select";
import useRawPathValue from "../../hooks/Path/useRawPath.ts";

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
        point.events[eventIndex] = { ...event, name };

        const newPoint = {
            ...point,
            events: [
                ...point.events
            ]
        };
        setPoint(newPoint);
    }, [point, setPoint]);

    const onParamsChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!point || !event || !point.events)
            return;
        const eventIndex = point.events.findIndex(e => e.id === props.eventID);
        point.events[eventIndex] = { ...event, params: e.target.value };

        const newPoint = {
            ...point,
            events: [
                ...point.events
            ]
        };
        setPoint(newPoint);
    }, [point, setPoint]);

    console.log(eventList);

    return (
        <div style={{ padding: 20 }}>
            <Suggest
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
        </div>
    )
}