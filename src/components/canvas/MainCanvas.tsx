import { Layer, Stage } from "react-konva";
import GridRenderer from "./GridRenderer.tsx";
import useWindowSize from "../../hooks/Canvas/useWindowSize.ts";
import useSettingsValue from "../../hooks/Utils/useSettings.ts";
import FieldImageRenderer from "./FieldImageRenderer.tsx";
import useWindowScaleValue from "../../hooks/Canvas/useWindowScale.ts";
import PathRenderer from "./PathRenderer.tsx";
import AnimationRenderer from "./AnimationRenderer.tsx";
import React from "react";
import { useSetSelectedPoint } from "../../hooks/Point/useSelectPoint.ts";
import useCameraControl from "../../hooks/Canvas/useCameraControl.ts";

export default function MainCanvas() {
    const { pixelsPerInch } = useSettingsValue();
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
                x={windowWidth / 2}
                y={windowHeight / 2}
                scaleX={windowScale * camera.scale}
                scaleY={windowScale * camera.scale}
            >
                <FieldImageRenderer />
                <PathRenderer />
                <AnimationRenderer />
                <GridRenderer
                    cellSize={pixelsPerInch * 12}
                    color={"#333"}
                />
                <GridRenderer
                    cellSize={pixelsPerInch * 24}
                    color={"#444"}
                />
            </Layer>
        </Stage>
    )
}