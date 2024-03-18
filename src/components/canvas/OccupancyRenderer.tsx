import useOccupancy from "../../hooks/Occupancy/useOccupancy.ts";
import { Group } from "react-konva";
import useSettingsValue from "../../hooks/Utils/useSettings.ts";
import React from "react";
import { KonvaEventObject } from "konva/lib/Node";
import useSaveUndoHistory from "../../hooks/Utils/useUndoHistory.ts";
import OccupancyCellRenderer from "./OccupancyCellRenderer.tsx";

export default function OccupancyRenderer() {
    const {
        pixelsPerInch,
        showOccupancyGrid,
        fieldWidth,
        fieldHeight
    } = useSettingsValue();
    const [occupancy, setOccupancy] = useOccupancy();
    const offsetX = (fieldWidth * pixelsPerInch) / 2;
    const offsetY = (fieldHeight * pixelsPerInch) / 2;
    const [isDrawing, setIsDrawing] = React.useState(false);
    const [isErasing, setIsErasing] = React.useState(false);
    const saveFileHistory = useSaveUndoHistory();

    /*
        Mouse Events
     */
    const onMouseDown = React.useCallback((e: KonvaEventObject<MouseEvent>) => {

        // Toggle Drawing
        if (e.evt.buttons === 1)
            setIsDrawing(true);

    }, [setIsDrawing]);

    const onMouseUp = React.useCallback(() => {

        // Save File History
        if (isDrawing) {
            const newOccupancy = occupancy.map(r => r.map(v => v));
            setOccupancy(newOccupancy);
            saveFileHistory();
        }
        setIsDrawing(false);

    }, [occupancy, setOccupancy, isDrawing, setIsDrawing, saveFileHistory]);

    if (!showOccupancyGrid)
        return null;
    return (
        <Group
            x={-offsetX}
            y={-offsetY}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
        >
            {occupancy.map((row, x) => (
                row.map((isOccupied, y) => (
                    <OccupancyCellRenderer
                        key={`occupancy-${x}-${y}`}
                        x={x}
                        y={y}
                        isOccupied={isOccupied}
                        isErasing={isErasing}
                        setIsErasing={setIsErasing}
                    />
                ))
            ))}
        </Group>
    );
}