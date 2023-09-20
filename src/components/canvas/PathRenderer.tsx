import { Line } from "react-konva";
import usePathPlanValue from "../../hooks/usePathPlan.tsx";
import React from "react";
import useSettingsValue from "../../hooks/useSettings.tsx";
import PointRenderer from "./PointRenderer.tsx";
import usePathSpline from "../../hooks/usePathSpline.tsx";

const PATH_COLOR = "#ddd";
const PATH_WIDTH = 1; // in
const PATH_DASH = [1, 3]; // in
const SPLINE_INTERVAL = 0.05; // %

export default function PathRenderer() {
    const pathPlan = usePathPlanValue();
    const { pixelsPerInch } = useSettingsValue();
    const pathSpline = usePathSpline();

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

    return (
        <>
            <Line
                points={linePoints.flat()}
                stroke={PATH_COLOR}
                strokeWidth={PATH_WIDTH * pixelsPerInch}
                lineCap={"round"}
                lineJoin={"round"}
                dash={PATH_DASH.map((dash) => dash * pixelsPerInch)}
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