import { Button, Card, Icon } from "@blueprintjs/core";
import { useSelectedPointValue } from "../../hooks/Point/useSelectPoint.ts";
import { usePathPoint } from "../../hooks/Point/usePathPoint.ts";
import { DEFAULT_GUID } from "../../utils/generateGUID.ts";
import PointBooleanInput from "../input/PointBooleanInput.tsx";
import EventsEditorPanel from "./EventsEditorPanel.tsx";
import useDeletePoint from "../../hooks/Point/useDeletePoint.ts";

export default function PointEditorPanel() {
    const selectedPointID = useSelectedPointValue();
    const [point] = usePathPoint(selectedPointID ?? DEFAULT_GUID);
    const deletePoint = useDeletePoint();

    if (!selectedPointID || !point)
        return null;
    return (
        <Card
            elevation={2}
            style={{
                width: 300,
                paddingTop: 0,
                paddingBottom: 10,
                pointerEvents: "auto"
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
            <Button
                fill
                icon={"trash"}
                text={"Delete Point"}
                intent={"danger"}
                onClick={() => deletePoint(selectedPointID)}
            />
            <EventsEditorPanel />
        </Card>
    )
}