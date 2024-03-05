import { Button, ButtonGroup, Card, Icon } from "@blueprintjs/core";
import useSelectedPoint from "../../hooks/Point/useSelectPoint.ts";
import { usePathPoint } from "../../hooks/Point/usePathPoint.ts";
import { DEFAULT_GUID } from "../../utils/generateGUID.ts";
import PointBooleanInput from "../input/PointBooleanInput.tsx";
import EventsEditorPanel from "./EventsEditorPanel.tsx";
import useDeletePoint from "../../hooks/Point/useDeletePoint.ts";
import usePrevPathPointValue from "../../hooks/Point/usePrevPathPoint.ts";
import useNextPathPointValue from "../../hooks/Point/useNextPathPoint.ts";
import React from "react";

export default function PointEditorPanel() {
    const [selectedPointID, setSelectedPointID] = useSelectedPoint();
    const prevPoint = usePrevPathPointValue(selectedPointID ?? DEFAULT_GUID);
    const nextPoint = useNextPathPointValue(selectedPointID ?? DEFAULT_GUID);
    const [point] = usePathPoint(selectedPointID ?? DEFAULT_GUID);
    const deletePoint = useDeletePoint();

    // Select next/prev point
    const selectNextPoint = React.useCallback(() => {
        if (nextPoint)
            setSelectedPointID(nextPoint.id);
    }, [setSelectedPointID, nextPoint])
    const selectPrevPoint = React.useCallback(() => {
        if (prevPoint)
            setSelectedPointID(prevPoint.id);
    }, [setSelectedPointID, prevPoint]);

    // Format X,Y
    const x = point?.x.toFixed(2);
    const y = point?.y.toFixed(2);
    const r = (180 / Math.PI * (point?.r ?? 0)).toFixed(2);

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

            <ButtonGroup fill style={{ marginTop: 10 }}>
                <Button
                    icon={"double-chevron-left"}
                    minimal
                    onClick={selectPrevPoint}
                    disabled={!prevPoint}
                />
                <div>
                    <h3 style={{ margin: 5 }}>
                        <Icon
                            icon={"area-of-interest"}
                            style={{
                                marginRight: 7,
                                marginBottom: 2
                            }}
                        />
                        Point
                    </h3>
                    <p className={"bp5-text-muted"} style={{ margin: 0 }}>
                        {x}in {y}in {r}°
                    </p>
                </div>
                <Button
                    icon={"double-chevron-right"}
                    minimal
                    onClick={selectNextPoint}
                    disabled={!nextPoint}
                />
            </ButtonGroup>

            <h4
                style={{
                    marginBottom: 4
                }}
            >
                Options
            </h4>
            <PointBooleanInput
                label={"Change Direction"}
                setting={"isReversed"}
            />
            <EventsEditorPanel />
            <Button
                fill
                icon={"trash"}
                text={"Delete Point"}
                intent={"danger"}
                onClick={() => deletePoint(selectedPointID)}
            />
        </Card>
    )
}