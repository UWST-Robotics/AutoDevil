import GUID from "../../types/GUID.ts";
import { Circle } from "react-konva";
import useSettingsValue from "../../hooks/useSettings.tsx";
import { usePathPoint } from "../../hooks/usePathPoint.tsx";
import { KonvaEventObject } from "konva/lib/Node";
import React from "react";

interface RotateHandleRendererProps {
    id: GUID;
}

const HANDLE_COLOR = "#fff";
const HANDLE_RADIUS = 1; // in
const HANDLE_LINE_WIDTH = 0.5; // in

export default function RotateHandleRenderer(props: RotateHandleRendererProps) {
    const { robotHeight } = useSettingsValue();
    const { pixelsPerInch } = useSettingsValue();
    const [point, setPoint] = usePathPoint(props.id);

    const pointOrgin = React.useMemo(() => {
        return {
            x: 0,
            y: robotHeight * pixelsPerInch * 0.8,
        };
    }, [robotHeight, pixelsPerInch]);

    // Drag events
    const onDragMove = React.useCallback((e: KonvaEventObject<DragEvent>) => {
        if (!point)
            return;
        const deltaAngle = Math.atan2(e.target.y(), e.target.x()) * 180 / Math.PI - 90;
        setPoint({
            ...point,
            r: deltaAngle + point.r,
        });
        e.target.x(pointOrgin.x);
        e.target.y(pointOrgin.y);
        e.cancelBubble = true;
    }, [point, setPoint]);

    return (
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
    );
}