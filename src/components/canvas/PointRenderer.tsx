import RobotRenderer from "./RobotRenderer.tsx";
import useSettingsValue from "../../hooks/useSettings.tsx";
import React from "react";
import { Group } from "react-konva";
import { useSetCanvasMouseCursor } from "../../hooks/useCanvasMouseCursor.tsx";
import GUID from "../../types/GUID.ts";
import { usePathPoint } from "../../hooks/usePathPoint.tsx";
import { KonvaEventObject } from "konva/lib/Node";
import RotateHandleRenderer from "./RotateHandleRenderer.tsx";

interface PointRendererProps {
    id: GUID;
}

export default function PointRenderer(props: PointRendererProps) {
    const { pixelsPerInch } = useSettingsValue();
    const setMouseCursor = useSetCanvasMouseCursor();
    const [isHovered, setIsHovered] = React.useState(false);
    const [point, setPoint] = usePathPoint(props.id);

    // Mouse events
    const onMouseEnter = React.useCallback(() => {
        setIsHovered(true);
        setMouseCursor("pointer");
    }, [setMouseCursor]);
    const onMouseLeave = React.useCallback(() => {
        setIsHovered(false);
        setMouseCursor("default");
    }, [setMouseCursor]);

    // Drag events
    const onDragStart = React.useCallback(() => {
        // TODO: Dragging
    }, []);
    const onDragMove = React.useCallback((e: KonvaEventObject<DragEvent>) => {
        if (!point)
            return;
        setPoint({
            ...point,
            x: e.target.x() / pixelsPerInch,
            y: e.target.y() / pixelsPerInch,
        });
        console.log("WRONG");
    }, [point, pixelsPerInch, setPoint]);
    const onDragEnd = React.useCallback((e: KonvaEventObject<DragEvent>) => {
        if (!point)
            return;
        setPoint({
            ...point,
            x: e.target.x() / pixelsPerInch,
            y: e.target.y() / pixelsPerInch,
        });
    }, [point, pixelsPerInch, setPoint]);

    if (!point)
        return;
    return (
        <>
            <Group
                x={point.x * pixelsPerInch}
                y={point.y * pixelsPerInch}
                rotation={point.r}
                opacity={isHovered ? 1 : 0.5}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onDragStart={onDragStart}
                onDragMove={onDragMove}
                onDragEnd={onDragEnd}
                draggable
                isListening={true}
            >
                <RobotRenderer />
                <RotateHandleRenderer id={point.id} />
            </Group>
        </>
    )
}