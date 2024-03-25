import { Group, Line } from "react-konva";
import useRawAutoDataValue from "../../hooks/Utils/useAutoData.ts";
import React from "react";
import useSettingsValue from "../../hooks/Utils/useSettings.ts";
import PointRenderer from "./PointRenderer.tsx";
import usePathSpline from "../../hooks/Path/usePathSpline.ts";
import useAddPoint from "../../hooks/Point/useAddPoint.ts";
import { KonvaEventObject } from "konva/lib/Node";
import useCursorListener from "../../hooks/Canvas/useCursorListener.ts";
import useScopeIndices from "../../hooks/Scope/useScopeIndices.ts";
import useSaveUndoHistory from "../../hooks/Utils/useUndoHistory.ts";

const PATH_COLOR = "#ddd";
const PATH_WIDTH = 0.4; // in
const PATH_CLICK_WIDTH = 4; // in
const SPLINE_INTERVAL = 0.05; // %

export default function PathRenderer() {
    const scopeIndices = useScopeIndices();
    const pathPlan = useRawAutoDataValue();
    const { pixelsPerInch, showOccupancyGrid } = useSettingsValue();
    const pathSpline = usePathSpline();
    const addPoint = useAddPoint();
    const savePathHistory = useSaveUndoHistory();
    const [onMouseOver, onMouseOut] = useCursorListener("pointer");

    // Click events
    const onClick = React.useCallback((e: KonvaEventObject<MouseEvent>, index: number) => {

        // Get Mouse Position
        const canvasMouse = e.currentTarget.getRelativePointerPosition();
        if (!canvasMouse)
            return;
        const mouseX = canvasMouse.x / pixelsPerInch;
        const mouseY = canvasMouse.y / pixelsPerInch;

        // Calculate the closest time to the click
        let deltaT = 0;
        let minDistance = Infinity;
        for (let i = 0; i < 1; i += SPLINE_INTERVAL) {
            const point = pathSpline.at(index + i);
            if (!point)
                continue;
            const dist = Math.hypot(point.x - mouseX, point.y - mouseY);
            if (dist < minDistance) {
                deltaT = i;
                minDistance = dist;
            }
        }

        // Add the point
        const newPoint = pathSpline.at(index + deltaT);
        addPoint({
            index: index + 1,
            x: newPoint?.x ?? mouseX,
            y: newPoint?.y ?? mouseY,
            r: pathSpline.angleAt(index + deltaT) ?? 0
        });
        savePathHistory();

        // Prevent the event from bubbling
        e.cancelBubble = true;
    }, [addPoint, pathSpline, pixelsPerInch, savePathHistory]);

    if (showOccupancyGrid)
        return null;
    return (
        <>
            {Array.from({ length: pathSpline.length }).map((_, index) => {

                if (index < scopeIndices.start || index >= scopeIndices.end)
                    return null;

                // Spline Points
                const points = Array.from({ length: 1 / SPLINE_INTERVAL + 1 }).map((_, i) => {
                    const point = pathSpline.at(index + i * SPLINE_INTERVAL);
                    if (!point)
                        return [];
                    return [
                        point.x * pixelsPerInch,
                        point.y * pixelsPerInch,
                    ];
                }).flat();

                return (
                    <Group key={index + "-line"}>
                        <Line
                            points={points}
                            stroke={PATH_COLOR}
                            strokeWidth={PATH_WIDTH * pixelsPerInch}
                            lineCap={"round"}
                            lineJoin={"round"}
                            listening={false}
                            perfectDrawEnabled={false}
                        />
                        <Line
                            points={points}
                            stroke={"transparent"}
                            strokeWidth={PATH_CLICK_WIDTH * pixelsPerInch}
                            onClick={(e) => onClick(e, index)}
                            onMouseEnter={onMouseOver}
                            onMouseLeave={onMouseOut}
                            listening={true}
                            perfectDrawEnabled={false}
                        />
                    </Group>
                );
            })}
            {pathPlan.points.map((point, index) => {
                if (index < scopeIndices.start || index > scopeIndices.end)
                    return null;
                return (
                    <PointRenderer
                        key={point.id}
                        id={point.id}
                    />
                )
            })}
        </>
    );
}