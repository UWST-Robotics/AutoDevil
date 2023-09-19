import { Layer, Stage } from "react-konva";
import CanvasGrid from "./CanvasGrid.tsx";
import useWindowSize from "../../hooks/useWindowSize.tsx";
import useSettingsValue from "../../hooks/useSettings.tsx";
import FieldImage from "./FieldImage.tsx";
import useWindowScaleValue from "../../hooks/useWindowScale.tsx";

export default function MainCanvas() {
    const settings = useSettingsValue();
    const windowScale = useWindowScaleValue();
    const [windowWidth, windowHeight] = useWindowSize();

    return (
        <Stage
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
                <FieldImage />
                <CanvasGrid
                    cellSize={settings.pixelsPerInch * 12}
                    gridSize={100}
                    color={"#2f2f2f"}
                />
            </Layer>
        </Stage>
    )
}