import Pose from "../../../types/Pose.ts";
import React from "react";
import {Line} from "react-konva";

export interface SplineRendererProps extends React.ComponentProps<typeof Line> {
    path: Pose[];
}

export default function PathRenderer(props: SplineRendererProps) {

    // Convert the path poses to an array of numbers for the Line component
    const pathPoints = React.useMemo(() => {
        const points: number[] = [];
        for (const point of props.path)
            points.push(point.x, point.y);

        return points;
    }, [props.path]);

    return (
        <Line
            {...props}
            points={pathPoints}
        />
    )

}