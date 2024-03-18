import { useOccupancyValue } from "../../hooks/Occupancy/useOccupancy.ts";
import { Rect } from "react-konva";
import useSettingsValue from "../../hooks/Utils/useSettings.ts";
import React from "react";
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";

export interface OccupancyCellRendererProps {
    x: number;
    y: number;
    isOccupied: boolean;
    isErasing: boolean;
    setIsErasing: (v: boolean) => void;
}

export default function OccupancyCellRenderer(props: OccupancyCellRendererProps) {
    const rectRef = React.useRef<Konva.Rect>(null);
    const { pixelsPerInch, occupancyInchesPerCell } = useSettingsValue();
    const occupancy = useOccupancyValue();

    // Calculated from values
    const pixelsPerCell = occupancyInchesPerCell * pixelsPerInch;
    const { x, y, isOccupied, isErasing, setIsErasing } = props;

    const updateView = React.useCallback(() => {
        if (!rectRef.current)
            return;

        rectRef.current.setAttr("opacity", occupancy[x][y] ? 1 : 0);
    }, [occupancy, x, y, rectRef]);

    /*
        Mouse Events
     */
    const onMouseMove = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        if (e.evt.buttons !== 1)
            return;

        // Update Occupancy At Position
        occupancy[x][y] = !isErasing;
        updateView();
    }, [updateView, occupancy, isErasing, x, y]);

    const onMouseDown = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        if (e.evt.buttons !== 1)
            return;

        // Set Erasing Mode Based on First Interaction
        setIsErasing(occupancy[x][y]);

        // Update Occupancy without forcing re-render
        occupancy[x][y] = !occupancy[x][y];
        updateView();
    }, [updateView, occupancy, setIsErasing, x, y]);

    return (
        <Rect
            x={x * pixelsPerCell}
            y={y * pixelsPerCell}
            width={pixelsPerCell}
            height={pixelsPerCell}
            opacity={isOccupied ? 1 : 0}
            fill={"rgba(255, 0, 0, 0.3)"}
            onMouseMove={onMouseMove}
            onMouseDown={onMouseDown}
            ref={rectRef}
        />
    );
}