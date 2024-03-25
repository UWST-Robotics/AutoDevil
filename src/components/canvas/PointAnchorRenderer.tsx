import GUID from "../../types/GUID.ts";
import { Circle, Group, Line } from "react-konva";
import useSettingsValue from "../../hooks/Utils/useSettings.ts";
import { usePathPoint } from "../../hooks/Point/usePathPoint.ts";
import { KonvaEventObject } from "konva/lib/Node";
import React from "react";
import { useSetSelectedPoint } from "../../hooks/Point/useSelectPoint.ts";
import { normalizeRadians } from "../../utils/toDegrees.ts";
import useSaveUndoHistory from "../../hooks/Utils/useUndoHistory.ts";

interface RotateHandleRendererProps {
    id: GUID;
    isExit: boolean;
    color?: string;
}

const HANDLE_RADIUS = 1; // in
const HANDLE_LINE_WIDTH = 0.5; // in
const SNAP_ANGLE = Math.PI / 16; // rad

export default function PointAnchorRenderer(props: RotateHandleRendererProps) {
    const { pixelsPerInch, snapRotation } = useSettingsValue();
    const [point, setPoint] = usePathPoint(props.id);
    const setSelectedPointID = useSetSelectedPoint();
    const savePathHistory = useSaveUndoHistory();

    // Calculate handle origin
    const pointOrgin = React.useMemo(() => {
        return {
            x: props.isExit ? (point?.exitDelta ?? 0) * pixelsPerInch : -(point?.enterDelta ?? 0) * pixelsPerInch,
            y: 0,
        };
    }, [point, pixelsPerInch, props.isExit]);

    // Drag events
    const onDragMove = React.useCallback((e: KonvaEventObject<DragEvent>) => {
        if (!point)
            return;

        // Calculate delta angle and distance
        const deltaAngle = Math.atan2(e.target.y(), e.target.x()) + (props.isExit ? 0 : Math.PI);
        const deltaDistance = Math.sqrt(e.target.x() ** 2 + e.target.y() ** 2);

        // Calculate angle
        let r = normalizeRadians(point.r + deltaAngle);
        if (snapRotation) {
            const snap = Math.round(r / SNAP_ANGLE) * SNAP_ANGLE;
            if (Math.abs(snap - r) < SNAP_ANGLE / 2)
                r = snap;
        }

        // Update point
        setPoint({
            ...point,
            r,
            exitDelta: props.isExit ? deltaDistance / pixelsPerInch : point.exitDelta,
            enterDelta: !props.isExit ? deltaDistance / pixelsPerInch : point.enterDelta,
        });

        // Reset handle position
        e.target.x(pointOrgin.x);
        e.target.y(pointOrgin.y);
        e.cancelBubble = true;

        // Select this point
        setSelectedPointID(props.id);

        e.cancelBubble = true;
    }, [point, pixelsPerInch, pointOrgin, props.isExit, setPoint, setSelectedPointID, props.id, snapRotation]);
    const onDragEnd = React.useCallback((e: KonvaEventObject<DragEvent>) => {
        onDragMove(e);
        savePathHistory();
    }, [onDragMove, savePathHistory]);

    return (
        <Group>
            <Circle
                x={pointOrgin.x}
                y={pointOrgin.y}
                radius={HANDLE_RADIUS * pixelsPerInch}
                stroke={props.color ?? "#fff"}
                strokeWidth={HANDLE_LINE_WIDTH * pixelsPerInch}
                fill={"transparent"}
                draggable
                onDragMove={onDragMove}
                onDragEnd={onDragEnd}
                perfectDrawEnabled={false}
            />
            <Line
                points={[
                    0,
                    0,
                    pointOrgin.x,
                    pointOrgin.y,
                ]}
                stroke={props.color ?? "#fff"}
                strokeWidth={HANDLE_LINE_WIDTH * pixelsPerInch}
                listening={false}
                perfectDrawEnabled={false}
            />
        </Group>
    );
}