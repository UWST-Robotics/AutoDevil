import RobotRenderer from "./RobotRenderer.tsx";
import useSettingsValue from "../../hooks/useSettings.ts";
import React from "react";
import { Group } from "react-konva";
import GUID from "../../types/GUID.ts";
import { usePathPoint } from "../../hooks/Point/usePathPoint.ts";
import { KonvaEventObject } from "konva/lib/Node";
import PointAnchorRenderer from "./PointAnchorRenderer.tsx";
import toDegrees from "../../utils/toDegrees.ts";
import usePathEnds from "../../hooks/Point/usePathEnds.ts";
import useSelectedPoint from "../../hooks/Point/useSelectPoint.ts";
import useCursorListener from "../../hooks/Canvas/useCursorListener.ts";
import { useAnimState } from "../../hooks/Canvas/useGetAnimState.ts";

interface PointRendererProps {
    id: GUID;
}

export default function PointRenderer(props: PointRendererProps) {
    const { pixelsPerInch } = useSettingsValue();
    const cursorListener = useCursorListener("pointer");
    const [isHovered, setIsHovered] = React.useState(false);
    const [selectedPointID, setSelectedPointID] = useSelectedPoint();
    const [point, setPoint] = usePathPoint(props.id);
    const { isStart, isEnd } = usePathEnds(props.id);
    const animState = useAnimState(props.id);

    const isSelected = React.useMemo(() => selectedPointID === props.id, [selectedPointID, props.id]);

    // Mouse events
    const onMouseOver = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        setIsHovered(true);
        cursorListener.onMouseOver(e);
    }, [cursorListener]);
    const onMouseOut = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        setIsHovered(false);
        cursorListener.onMouseOut(e);
    }, [cursorListener]);

    // Click events
    const onClick = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        setSelectedPointID(isSelected ? undefined : props.id);
        e.cancelBubble = true;
    }, [setSelectedPointID, isSelected, props.id]);

    // Drag events
    const onDrag = React.useCallback((e: KonvaEventObject<DragEvent>) => {
        if (!point)
            return;
        setPoint({
            ...point,
            x: e.target.x() / pixelsPerInch,
            y: e.target.y() / pixelsPerInch,
        });
        setSelectedPointID(props.id);
    }, [point, pixelsPerInch, setPoint, setSelectedPointID, props.id]);

    // Color
    const color = React.useMemo(() => {
        if (isSelected)
            return "#fa2";
        if (isStart)
            return "#2f2";
        if (isEnd)
            return "#f22";
        return "#fff";
    }, [isSelected, isStart, isEnd]);

    if (!point)
        return;
    return (
        <>
            <Group
                x={point.x * pixelsPerInch}
                y={point.y * pixelsPerInch}
                rotation={toDegrees(point.r)}
                opacity={isHovered || isSelected ? 1 : 0.5}
                onClick={onClick}
                onMouseEnter={onMouseOver}
                onMouseLeave={onMouseOut}
                onDragMove={onDrag}
                onDragEnd={onDrag}
                draggable
                isListening={true}
            >
                <RobotRenderer
                    color={color}
                    isFlipped={animState.isReversed}
                />
                {!isEnd && (
                    <PointAnchorRenderer
                        id={point.id}
                        isExit={true}
                        color={color}
                    />
                )}
                {!isStart && (
                    <PointAnchorRenderer
                        id={point.id}
                        isExit={false}
                        color={color}
                    />
                )}
            </Group>
        </>
    )
}