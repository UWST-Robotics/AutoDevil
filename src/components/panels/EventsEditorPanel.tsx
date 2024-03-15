import { useSelectedPointValue } from "../../hooks/Point/useSelectPoint.ts";
import usePathPointValue from "../../hooks/Point/usePathPoint.ts";
import { DEFAULT_GUID } from "../../utils/generateGUID.ts";
import { List } from "@mui/material";
import EventEditorPanel from "./EventEditorPanel.tsx";

export default function EventsEditorPanel() {
    const selectedPointID = useSelectedPointValue();
    const point = usePathPointValue(selectedPointID ?? DEFAULT_GUID);

    return (
        <List>
            {point?.events?.map(event => (
                <EventEditorPanel
                    key={event.id}
                    eventID={event.id}
                />
            ))}
        </List>
    )
}