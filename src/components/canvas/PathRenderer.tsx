import { Line } from "react-konva";
import usePathPlanValue from "../../hooks/usePathPlan.tsx";
import React from "react";
import useSettingsValue from "../../hooks/useSettings.tsx";
import PointRenderer from "./PointRenderer.tsx";

const PATH_COLOR = "red";
const PATH_WIDTH = 1; // in
const PATH_DASH = [1, 2]; // in
const PATH_TENSION = 0.6; // 0-1

export default function PathRenderer() {
    const pathPlan = usePathPlanValue();
    const { pixelsPerInch } = useSettingsValue();

    const linePoints = React.useMemo(() => {
        return pathPlan.points.map((point) => {
            return [
                point.x * pixelsPerInch,
                point.y * pixelsPerInch,
            ];
        });
    }, [pathPlan, pixelsPerInch]);

    return (
        <>
            <Line
                points={linePoints.flat()}
                stroke={PATH_COLOR}
                strokeWidth={PATH_WIDTH * pixelsPerInch}
                lineCap={"round"}
                lineJoin={"round"}
                dash={PATH_DASH.map((dash) => dash * pixelsPerInch)}
                tension={PATH_TENSION}
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