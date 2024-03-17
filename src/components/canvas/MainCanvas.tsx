import { Layer, Stage } from "react-konva";
import GridRenderer from "./GridRenderer.tsx";
import useWindowSize from "../../hooks/Canvas/useWindowSize.ts";
import FieldImageRenderer from "./FieldImageRenderer.tsx";
import useWindowScaleValue from "../../hooks/Canvas/useWindowScale.ts";
import PathRenderer from "./PathRenderer.tsx";
import AnimationRenderer from "./AnimationRenderer.tsx";
import React from "react";
import { useSetSelectedPoint } from "../../hooks/Point/useSelectPoint.ts";
import useCameraControl from "../../hooks/Canvas/useCameraControl.ts";
import OccupancyRenderer from "./OccupancyRenderer.tsx";

export default function MainCanvas() {
    const windowScale = useWindowScaleValue();
    const [windowWidth, windowHeight] = useWindowSize();
    const setSelectedPoint = useSetSelectedPoint();
    const camera = useCameraControl();

    // Handle On Click
    const onClick = React.useCallback(() => {
        setSelectedPoint(undefined);
    }, [setSelectedPoint]);

    return (
        <Stage
            width={windowWidth}
            height={windowHeight}
            onClick={onClick}
            perfectDrawEnabled={false}

            x={camera.x}
            y={camera.y}

            onMouseDown={camera.onMouseDown}
            onMouseUp={camera.onMouseUp}
            onDragEnd={camera.onDragEnd}
            onContextMenu={camera.onContextMenu}
            onWheel={camera.onScroll}
        >
            <Layer
                scaleX={windowScale * camera.scale}
                scaleY={windowScale * camera.scale}
                x={windowWidth / 2}
                y={windowHeight / 2}
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