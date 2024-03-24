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
const PATH_WIDTH = 1; // in
const PATH_DASH = [2, 4]; // in
const SPLINE_INTERVAL = 0.1; // %

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
        const x = pathSpline.at(index + 0.5)?.x ?? 0;
        const y = pathSpline.at(index + 0.5)?.y ?? 0;
        const r = pathSpline.angleAt(index + 0.5) ?? 0;
        addPoint({
            index: index + 1,
            x,
            y,
            r,
        });
        e.cancelBubble = true;
        savePathHistory();
    }, [addPoint, pathSpline, savePathHistory]);

    if (showOccupancyGrid)
        return null;
    return (
        <>
            {Array.from({ length: pathSpline.length }).map((_, index) => {

                if (index < scopeIndices.start || index >= scopeIndices.end)
                    return null;

                // Spline Points
                const points = Array.from({ length: 1 / SPLINE_INTERVAL }).map((_, i) => {
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
                            dash={PATH_DASH.map((dash) => dash * pixelsPerInch)}
                            lineCap={"round"}
                            lineJoin={"round"}
                            listening={false}
                            perfectDrawEnabled={false}
                        />
                        <Line
                            points={points}
                            stroke={"transparent"}
                            strokeWidth={PATH_WIDTH * pixelsPerInch * 4}
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