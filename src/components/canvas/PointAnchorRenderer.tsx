import GUID from "../../types/GUID.ts";
import { Circle, Line } from "react-konva";
import useSettingsValue from "../../hooks/useSettings.ts";
import { usePathPoint } from "../../hooks/usePathPoint.ts";
import { KonvaEventObject } from "konva/lib/Node";
import React from "react";

interface RotateHandleRendererProps {
    id: GUID;
    isExit: boolean;
}

const HANDLE_COLOR = "#fff";
const HANDLE_RADIUS = 1; // in
const HANDLE_LINE_WIDTH = 0.5; // in

export default function PointAnchorRenderer(props: RotateHandleRendererProps) {
    const { pixelsPerInch } = useSettingsValue();
    const [point, setPoint] = usePathPoint(props.id);

    const pointOrgin = React.useMemo(() => {
        return {
            x: 0,
            y: props.isExit ? (point?.exitDelta ?? 0) * pixelsPerInch : -(point?.enterDelta ?? 0) * pixelsPerInch,
        };
    }, [point, pixelsPerInch]);

    // Drag events
    const onDragMove = React.useCallback((e: KonvaEventObject<DragEvent>) => {
        if (!point)
            return;
        const deltaAngle = Math.atan2(e.target.y(), e.target.x()) + Math.PI / 2 * (props.isExit ? -1 : 1);
        const deltaDistance = Math.sqrt(e.target.x() ** 2 + e.target.y() ** 2);
        setPoint({
            ...point,
            r: point.r + deltaAngle,
            exitDelta: props.isExit ? deltaDistance / pixelsPerInch : point.exitDelta,
            enterDelta: !props.isExit ? deltaDistance / pixelsPerInch : point.enterDelta,
        });
        e.target.x(pointOrgin.x);
        e.target.y(pointOrgin.y);
        e.cancelBubble = true;
    }, [point, pixelsPerInch, pointOrgin, setPoint]);

    return (
        <>
            <Circle
                x={pointOrgin.x}
                y={pointOrgin.y}
                radius={HANDLE_RADIUS * pixelsPerInch}
                stroke={HANDLE_COLOR}
                strokeWidth={HANDLE_LINE_WIDTH * pixelsPerInch}
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
                stroke={HANDLE_COLOR}
                strokeWidth={HANDLE_LINE_WIDTH * pixelsPerInch}
                listening={false}
            />
        </>
    );
}