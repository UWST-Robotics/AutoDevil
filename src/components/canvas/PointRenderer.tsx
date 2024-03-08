import RobotRenderer from "./RobotRenderer.tsx";
import useSettingsValue from "../../hooks/Utils/useSettings.ts";
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
import useNextPathPointValue from "../../hooks/Point/useNextPathPoint.ts";
import { usePrevPathPoint } from "../../hooks/Point/usePrevPathPoint.ts";
import PathPoint from "../../types/PathPoint.ts";

interface PointRendererProps {
    id: GUID;
}

const SNAP_DISTANCE = 2; // in

export default function PointRenderer(props: PointRendererProps) {
    const { pixelsPerInch, isSpline, snapPosition } = useSettingsValue();
    const cursorListener = useCursorListener("pointer");
    const [isHovered, setIsHovered] = React.useState(false);
    const [selectedPointID, setSelectedPointID] = useSelectedPoint();
    const [point, setPoint] = usePathPoint(props.id);
    const nextPoint = useNextPathPointValue(props.id);
    const [prevPoint, setPrevPoint] = usePrevPathPoint(props.id);
    const { isStart, isEnd } = usePathEnds(props.id);

    // Check if selected
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

    // Angle Calculation
    const calcAngle = React.useCallback((a: PathPoint, b: PathPoint) => {
        let angle = Math.atan2(
            a.x - b.x,
            a.y - b.y
        ) + (Math.PI / 2);

        if (a.isReversed)
            angle += Math.PI;

        return -angle;
    }, []);

    // Drag events
    const onDrag = React.useCallback((e: KonvaEventObject<DragEvent>) => {
        if (!point)
            return;

        // Calculate new position
        let x = e.target.x() / pixelsPerInch;
        let y = e.target.y() / pixelsPerInch;

        // Snap to grid
        if (snapPosition) {
            x = Math.round(x / SNAP_DISTANCE) * SNAP_DISTANCE;
            y = Math.round(y / SNAP_DISTANCE) * SNAP_DISTANCE;

            e.target.x(x * pixelsPerInch);
            e.target.y(y * pixelsPerInch);
        }

        // Calculate angle between this and next point
        const currentPoint = { ...point, x, y };
        const angle = calcAngle(currentPoint, nextPoint ?? currentPoint);

        setPoint({
            ...point,
            x: currentPoint.x,
            y: currentPoint.y,
            r: (isSpline || isEnd) ? point.r : angle
        });

        // Update Previous Point
        if (prevPoint && !isSpline) {
            const prevAngle = calcAngle(prevPoint, currentPoint);
            setPrevPoint({
                ...prevPoint,
                r: prevAngle
            });
        }

        setSelectedPointID(props.id);
    }, [point, pixelsPerInch, setPoint, setSelectedPointID, props.id, nextPoint, isEnd, isSpline, prevPoint, setPrevPoint, calcAngle, snapPosition]);

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
                rotation={toDegrees(point.state?.gyro ?? 0)}
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
                />
                {(!isEnd && isSpline) && (
                    <PointAnchorRenderer
                        id={point.id}
                        isExit={true}
                        color={color}
                    />
                )}
                {(!isStart && (isSpline || isEnd)) && (
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