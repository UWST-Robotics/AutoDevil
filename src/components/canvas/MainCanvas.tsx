import { Layer, Stage } from "react-konva";
import GridRenderer from "./GridRenderer.tsx";
import useWindowSize from "../../hooks/useWindowSize.tsx";
import useSettingsValue from "../../hooks/useSettings.tsx";
import FieldImageRenderer from "./FieldImageRenderer.tsx";
import useWindowScaleValue from "../../hooks/useWindowScale.tsx";
import PathRenderer from "./PathRenderer.tsx";
import useCanvasMouseCursorValue from "../../hooks/useCanvasMouseCursor.tsx";

export default function MainCanvas() {
    const { pixelsPerInch } = useSettingsValue();
    const windowScale = useWindowScaleValue();
    const [windowWidth, windowHeight] = useWindowSize();
    const mouseCursor = useCanvasMouseCursorValue();

    return (
        <Stage
            style={{
                cursor: mouseCursor,
            }}
            width={windowWidth}
            height={windowHeight}
            perfectDrawEnabled={false}
            onContextMenu={(e) => {
                e.evt.preventDefault()
            }}
        >
            <Layer
                x={windowWidth / 2}
                y={windowHeight / 2}
                scaleX={windowScale}
                scaleY={windowScale}
            >
                <FieldImageRenderer />
                <PathRenderer />
                <GridRenderer
                    cellSize={pixelsPerInch * 12}
                    gridSize={100}
                    color={"#444"}
                />
            </Layer>
        </Stage>
    )
}