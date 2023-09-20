import { Line } from "react-konva";
import usePathPlanValue from "../../hooks/usePathPlan.ts";
import React from "react";
import useSettingsValue from "../../hooks/useSettings.ts";
import PointRenderer from "./PointRenderer.tsx";
import usePathSpline from "../../hooks/usePathSpline.ts";
import useAddPoint from "../../hooks/useAddPoint.ts";
import { KonvaEventObject } from "konva/lib/Node";

const PATH_COLOR = "#ddd";
const PATH_WIDTH = 1; // in
const PATH_DASH = [1, 3]; // in
const SPLINE_INTERVAL = 0.05; // %

export default function PathRenderer() {
    const pathPlan = usePathPlanValue();
    const { pixelsPerInch } = useSettingsValue();
    const pathSpline = usePathSpline();
    const addPoint = useAddPoint();

    const linePoints = React.useMemo(() => {
        const points = [];
        for (let i = 0; i < pathSpline.length; i += SPLINE_INTERVAL) {
            const point = pathSpline.at(i);
            if (!point)
                continue;
            points.push([
                point.x * pixelsPerInch,
                point.y * pixelsPerInch,
            ]);
        }
        return points;
    }, [pathSpline, pixelsPerInch]);

    const onClick = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        const x = e.evt.offsetX / pixelsPerInch;
        const y = e.evt.offsetY / pixelsPerInch;
        addPoint({
            index: pathPlan.points.length,
            x,
            y,
            r: 0,
        });
    }, [addPoint, pathPlan.points.length, pixelsPerInch]);

    return (
        <>
            <Line
                points={linePoints.flat()}
                stroke={PATH_COLOR}
                strokeWidth={PATH_WIDTH * pixelsPerInch}
                lineCap={"round"}
                lineJoin={"round"}
                dash={PATH_DASH.map((dash) => dash * pixelsPerInch)}
                onClick={onClick}
            />
            {pathPlan.points.map((point, index) => (
                <PointRenderer
                    key={index}
                    id={point.id}
                />
            ))}
        </>
    );
}