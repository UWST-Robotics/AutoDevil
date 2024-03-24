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
import useSaveUndoHistory from "../../hooks/Utils/useUndoHistory.ts";

interface PointRendererProps {
    id: GUID;
}

const SNAP_DISTANCE = 2; // in

export default function PointRenderer(props: PointRendererProps) {
    const { pixelsPerInch, isSpline, snapPosition } = useSettingsValue();
    const [onPointerMouseOver, onPointerMouseOut] = useCursorListener("pointer");
    const [isHovered, setIsHovered] = React.useState(false);
    const [selectedPointID, setSelectedPointID] = useSelectedPoint();
    const [point, setPoint] = usePathPoint(props.id);
    const nextPoint = useNextPathPointValue(props.id);
    const [prevPoint, setPrevPoint] = usePrevPathPoint(props.id);
    const { isStart, isEnd } = usePathEnds(props.id);
    const savePathHistory = useSaveUndoHistory();

    // Check if selected
    const isSelected = React.useMemo(() => selectedPointID === props.id, [selectedPointID, props.id]);

    // Mouse events
    const onMouseOver = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        setIsHovered(true);
        onPointerMouseOver(e);
    }, [onPointerMouseOver]);
    const onMouseOut = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        setIsHovered(false);
        onPointerMouseOut(e);
    }, [onPointerMouseOut]);

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
    const onDragStart = React.useCallback((e: KonvaEventObject<DragEvent>) => {
        if (!point)
            return;
        setSelectedPointID(props.id);
        e.cancelBubble = true;
    }, [point, setSelectedPointID, props.id]);
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
        if (isSpline || isEnd)
            currentPoint.r = calcAngle(currentPoint, nextPoint ?? currentPoint);

        // Update Point
        setPoint({
            ...point,
            ...currentPoint
        });

        // Update Previous Point
        if (prevPoint && !isSpline) {
            const prevAngle = calcAngle(prevPoint, currentPoint);
            setPrevPoint({
                ...prevPoint,
                r: prevAngle
            });
        }
    }, [point, pixelsPerInch, setPoint, nextPoint, isEnd, isSpline, prevPoint, setPrevPoint, calcAngle, snapPosition]);
    const onDragEnd = React.useCallback((e: KonvaEventObject<DragEvent>) => {
        onDrag(e);
        savePathHistory();
    }, [onDrag, savePathHistory]);


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
        <Group
            x={point.x * pixelsPerInch}
            y={point.y * pixelsPerInch}
            rotation={toDegrees(point.state?.gyro ?? 0)}
            opacity={isHovered || isSelected ? 1 : 0.5}
            onClick={onClick}
            onMouseEnter={onMouseOver}
            onMouseLeave={onMouseOut}
            onDragStart={onDragStart}
            onDragMove={onDrag}
            onDragEnd={onDragEnd}
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
    )
}