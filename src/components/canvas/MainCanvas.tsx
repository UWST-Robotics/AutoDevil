import { Layer, Stage } from "react-konva";
import GridRenderer from "./GridRenderer.tsx";
import useWindowSize from "../../hooks/Canvas/useWindowSize.ts";
import FieldImageRenderer from "./FieldImageRenderer.tsx";
import PathRenderer from "./PathRenderer.tsx";
import AnimationRenderer from "./AnimationRenderer.tsx";
import React from "react";
import { useSetSelectedPoint } from "../../hooks/Point/useSelectPoint.ts";
import useCameraControl from "../../hooks/Canvas/useCameraControl.ts";
import OccupancyRenderer from "./OccupancyRenderer.tsx";

export default function MainCanvas() {
    const [windowWidth, windowHeight] = useWindowSize();
    const setSelectedPoint = useSetSelectedPoint();
    const { stageRef, layerRef } = useCameraControl();

    // Handle On Click
    const onClick = React.useCallback(() => {
        setSelectedPoint(undefined);
    }, [setSelectedPoint]);

    return (
        <Stage
            width={windowWidth}
            height={windowHeight}
            onClick={onClick}
            ref={stageRef}
        >
            <Layer
                x={windowWidth / 2}
                y={windowHeight / 2}
                ref={layerRef}
            >
                <FieldImageRenderer />
                <PathRenderer />
                <OccupancyRenderer />
                <AnimationRenderer />
                <GridRenderer
                    cellSize={12}
                    color={"#333"}
                />
                <GridRenderer
                    cellSize={24}
                    color={"#444"}
                />
            </Layer>
        </Stage>
    )
}