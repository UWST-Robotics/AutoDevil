import RobotRenderer from "./RobotRenderer.tsx";
import useSettingsValue from "../../hooks/useSettings.ts";
import React from "react";
import { Group } from "react-konva";
import { useSetCanvasMouseCursor } from "../../hooks/useCanvasMouseCursor.ts";
import GUID from "../../types/GUID.ts";
import { usePathPoint } from "../../hooks/usePathPoint.ts";
import { KonvaEventObject } from "konva/lib/Node";
import PointAnchorRenderer from "./PointAnchorRenderer.tsx";
import toDegrees from "../../utils/toDegrees.ts";
import usePathEnds from "../../hooks/usePathEnds.ts";
import useSelectedPoint from "../../hooks/useSelectPoint.ts";

interface PointRendererProps {
    id: GUID;
}

export default function PointRenderer(props: PointRendererProps) {
    const { pixelsPerInch } = useSettingsValue();
    const setMouseCursor = useSetCanvasMouseCursor();
    const [isHovered, setIsHovered] = React.useState(false);
    const [selectedPointID, setSelectedPointID] = useSelectedPoint();
    const [point, setPoint] = usePathPoint(props.id);
    const { isStart, isEnd } = usePathEnds(props.id);

    const isSelected = React.useMemo(() => selectedPointID === props.id, [selectedPointID, props.id]);

    // Mouse events
    const onMouseEnter = React.useCallback(() => {
        setIsHovered(true);
        setMouseCursor("pointer");
    }, [setMouseCursor]);
    const onMouseLeave = React.useCallback(() => {
        setIsHovered(false);
        setMouseCursor("default");
    }, [setMouseCursor]);

    // Click events
    const onClick = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        setSelectedPointID(isSelected ? undefined : props.id);
        e.cancelBubble = true;
    }, [props.id, setSelectedPointID]);

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
                rotation={toDegrees(point.r) - 90}
                opacity={isHovered ? 1 : 0.5}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onDragStart={onDragStart}
                onDragMove={onDragMove}
                onDragEnd={onDragEnd}
                draggable
                isListening={true}
            >
                <RobotRenderer
                    color={isSelected ? "#fa2" : isStart ? "#2f2" : isEnd ? "#f22" : undefined}
                />
                {!isEnd && (
                    <PointAnchorRenderer id={point.id} isExit={true} />
                )}
                {!isStart && (
                    <PointAnchorRenderer id={point.id} isExit={false} />
                )}
            </Group>
        </>
    )
}