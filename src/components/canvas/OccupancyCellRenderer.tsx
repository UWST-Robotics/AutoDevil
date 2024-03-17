import useOccupancy from "../../hooks/Occupancy/useOccupancy.ts";
import { Rect } from "react-konva";
import useSettingsValue from "../../hooks/Utils/useSettings.ts";
import React from "react";
import { KonvaEventObject } from "konva/lib/Node";

export interface OccupancyCellRendererProps {
    x: number;
    y: number;
    isOccupied: boolean;
    isErasing: boolean;
    setIsErasing: (v: boolean) => void;
}

export default function OccupancyCellRenderer(props: OccupancyCellRendererProps) {
    const { pixelsPerInch, occupancyInchesPerCell } = useSettingsValue();
    const [occupancy, setOccupancy] = useOccupancy();

    // Calculated from values
    const pixelsPerCell = occupancyInchesPerCell * pixelsPerInch;
    const { x, y, isOccupied, isErasing, setIsErasing } = props;

    /*
        Mouse Events
     */
    const onMouseMove = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        if (e.evt.buttons !== 1)
            return;

        // Update Occupancy At Position
        occupancy[x][y] = !isErasing;
        setOccupancy(occupancy);
    }, [occupancy, setOccupancy, isErasing, x, y]);

    const onMouseDown = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        if (e.evt.buttons !== 1)
            return;

        // Set Erasing Mode Based on First Interaction
        setIsErasing(occupancy[x][y]);

        // Cloning the object fixes a memory bug where
        // the first index is not registered in the undo/redo history
        const newOccupancy = occupancy.map(r => r.map(c => c));
        newOccupancy[x][y] = !newOccupancy[x][y];
        setOccupancy(newOccupancy);
    }, [occupancy, setOccupancy, x, y]);

    return (
        <Rect
            x={x * pixelsPerCell}
            y={y * pixelsPerCell}
            width={pixelsPerCell}
            height={pixelsPerCell}
            fill={isOccupied ? "rgba(255, 0, 0, 0.3)" : "rgba(0, 0, 0, 0)"}
            onMouseMove={onMouseMove}
            onMouseDown={onMouseDown}
        />
    );
}