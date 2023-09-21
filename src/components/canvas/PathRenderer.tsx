import { Group, Line } from "react-konva";
import usePathPlanValue from "../../hooks/usePathPlan.ts";
import React from "react";
import useSettingsValue from "../../hooks/useSettings.ts";
import PointRenderer from "./PointRenderer.tsx";
import usePathSpline from "../../hooks/usePathSpline.ts";
import useAddPoint from "../../hooks/useAddPoint.ts";
import { KonvaEventObject } from "konva/lib/Node";
import useWindowScaleValue from "../../hooks/useWindowScale.ts";
import useCursorListener from "../../hooks/useCursorListener.ts";

const PATH_COLOR = "#ddd";
const PATH_WIDTH = 1; // in
const PATH_DASH = [1, 3]; // in
const SPLINE_INTERVAL = 0.05; // %

export default function PathRenderer() {
    const pathPlan = usePathPlanValue();
    const { pixelsPerInch } = useSettingsValue();
    const windowScale = useWindowScaleValue();
    const pathSpline = usePathSpline();
    const addPoint = useAddPoint();
    const cursorListener = useCursorListener("pointer");

    // Click events
    const onClick = React.useCallback((e: KonvaEventObject<MouseEvent>, index: number) => {
        const x = (e.evt.offsetX - window.innerWidth / 2) / pixelsPerInch / windowScale;
        const y = (e.evt.offsetY - window.innerHeight / 2) / pixelsPerInch / windowScale;
        const r = (pathSpline.at(index + 0.5)?.r ?? 0) + Math.PI / 2;
        addPoint({
            index: index + 1,
            x,
            y,
            r,
        });
        e.cancelBubble = true;
    }, [addPoint, pathSpline, pixelsPerInch, windowScale]);

    return (
        <>
            {Array.from({ length: pathSpline.length }).map((_, index) => {

                // Calculate points
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
                    <Group key={index + "line"}>
                        <Line
                            points={points}
                            stroke={PATH_COLOR}
                            strokeWidth={PATH_WIDTH * pixelsPerInch}
                            dash={PATH_DASH.map((dash) => dash * pixelsPerInch)}
                            lineCap={"round"}
                            lineJoin={"round"}
                            listening={false}
                        />
                        <Line
                            points={points}
                            stroke={"transparent"}
                            strokeWidth={PATH_WIDTH * pixelsPerInch * 4}
                            onClick={(e) => onClick(e, index)}
                            onMouseEnter={cursorListener.onMouseOver}
                            onMouseLeave={cursorListener.onMouseOut}
                            listening={true}
                        />
                    </Group>
                );
            })}
            {pathPlan.points.map((point, index) => (
                <PointRenderer
                    key={index + "point"}
                    id={point.id}
                />
            ))}
        </>
    );
}