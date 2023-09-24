import { Card, Icon } from "@blueprintjs/core";
import { useSelectedPointValue } from "../../hooks/Point/useSelectPoint.ts";
import { usePathPoint } from "../../hooks/Point/usePathPoint.ts";
import { DEFAULT_GUID } from "../../utils/generateGUID.ts";
import PointBooleanInput from "../input/PointBooleanInput.tsx";
import EventsEditorPanel from "./EventsEditorPanel.tsx";

export default function PointEditorPanel() {
    const selectedPointID = useSelectedPointValue();
    const [point] = usePathPoint(selectedPointID ?? DEFAULT_GUID);

    if (!selectedPointID || !point)
        return null;
    return (
        <Card
            elevation={2}
            style={{
                width: 300,
                paddingTop: 0,
                paddingBottom: 10,
            }}
        >
            <h3>
                <Icon
                    icon={"area-of-interest"}
                    style={{
                        marginRight: 7,
                        marginBottom: 2
                    }}
                />
                Point
            </h3>
            <PointBooleanInput
                label={"Change Direction"}
                setting={"isReversed"}
            />
            <EventsEditorPanel />
        </Card>
    )
}