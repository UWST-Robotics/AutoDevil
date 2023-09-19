import { Layer, Stage } from "react-konva";
import CanvasGrid from "./CanvasGrid.tsx";
import useWindowSize from "../../hooks/useWindowSize.tsx";
import useSettingsValue from "../../hooks/useSettings.tsx";

export default function MainCanvas() {
    const settings = useSettingsValue();
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
            >
                <CanvasGrid
                    cellSize={settings.pixelsPerInch * 12}
                    gridSize={50}
                    color={"#151319"}
                />
            </Layer>
        </Stage>
    )
}