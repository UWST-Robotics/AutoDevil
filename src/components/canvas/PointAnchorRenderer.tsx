import GUID from "../../types/GUID.ts";
import { Circle, Line } from "react-konva";
import useSettingsValue from "../../hooks/useSettings.ts";
import { usePathPoint } from "../../hooks/Point/usePathPoint.ts";
import { KonvaEventObject } from "konva/lib/Node";
import React from "react";
import { useSetSelectedPoint } from "../../hooks/Point/useSelectPoint.ts";

interface RotateHandleRendererProps {
    id: GUID;
    isExit: boolean;
    color?: string;
}

const HANDLE_RADIUS = 1; // in
const HANDLE_LINE_WIDTH = 0.5; // in

export default function PointAnchorRenderer(props: RotateHandleRendererProps) {
    const { pixelsPerInch } = useSettingsValue();
    const [point, setPoint] = usePathPoint(props.id);
    const setSelectedPointID = useSetSelectedPoint();

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

        // Update point
        setPoint({
            ...point,
            r: (point.r + deltaAngle) % (Math.PI * 2),
            exitDelta: props.isExit ? deltaDistance / pixelsPerInch : point.exitDelta,
            enterDelta: !props.isExit ? deltaDistance / pixelsPerInch : point.enterDelta,
        });

        // Reset handle position
        e.target.x(pointOrgin.x);
        e.target.y(pointOrgin.y);
        e.cancelBubble = true;

        // Select this point
        setSelectedPointID(props.id);
    }, [point, pixelsPerInch, pointOrgin, props.isExit, setPoint, setSelectedPointID, props.id]);

    return (
        <>
            <Circle
                x={pointOrgin.x}
                y={pointOrgin.y}
                radius={HANDLE_RADIUS * pixelsPerInch}
                stroke={props.color ?? "#fff"}
                strokeWidth={HANDLE_LINE_WIDTH * pixelsPerInch}
                fill={"transparent"}
                draggable
                onDragMove={onDragMove}
                onDragEnd={onDragMove}
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
            />
        </>
    );
}