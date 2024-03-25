import { useOccupancyValue } from "../../hooks/Occupancy/useOccupancy.ts";
import { Rect } from "react-konva";
import useSettingsValue from "../../hooks/Utils/useSettings.ts";
import React from "react";
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";
import { useOccupancyToolValue } from "../../hooks/Occupancy/useOccupancyTool.ts";

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
    const currentTool = useOccupancyToolValue();

    // Calculated from values
    const pixelsPerCell = occupancyInchesPerCell * pixelsPerInch;
    const { x, y, isOccupied, isErasing, setIsErasing } = props;

    /*
        Tools
     */
    const recursiveFill = React.useCallback((x: number, y: number, targetValue: boolean) => {
        if (x < 0 || x >= occupancy.length || y < 0 || y >= occupancy[0].length)
            return;
        if (occupancy[x][y] === targetValue)
            return;
        occupancy[x][y] = targetValue;
        recursiveFill(x + 1, y, targetValue);
        recursiveFill(x - 1, y, targetValue);
        recursiveFill(x, y + 1, targetValue);
        recursiveFill(x, y - 1, targetValue);
    }, [occupancy]);

    const updateCell = React.useCallback((targetValue: boolean) => {

        // Update Occupancy At Position
        if (currentTool === "Draw") {
            occupancy[x][y] = targetValue;
        } else if (currentTool === "Fill") {
            recursiveFill(x, y, targetValue);
        }

        // Update View
        if (rectRef.current)
            rectRef.current.setAttr("opacity", occupancy[x][y] ? 1 : 0);

    }, [occupancy, x, y, currentTool, recursiveFill, rectRef]);

    /*
        Mouse Events
     */
    const onMouseMove = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        if (e.evt.buttons !== 1)
            return;
        updateCell(!isErasing);
    }, [updateCell, isErasing]);
    const onMouseDown = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        if (e.evt.buttons !== 1)
            return;
        setIsErasing(occupancy[x][y]);
        updateCell(!occupancy[x][y]);
    }, [updateCell, setIsErasing, occupancy, x, y]);

    /*
        Touch Events
     */
    const onTouchStart = React.useCallback((_: KonvaEventObject<TouchEvent>) => {
        setIsErasing(occupancy[x][y]);
        updateCell(!occupancy[x][y]);
    }, [updateCell, setIsErasing, occupancy, x, y]);
    const onTouchMove = React.useCallback((_: KonvaEventObject<TouchEvent>) => {
        updateCell(!isErasing);
    }, [updateCell, isErasing]);

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
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            ref={rectRef}
            perfectDrawEnabled={false}
        />
    );
}