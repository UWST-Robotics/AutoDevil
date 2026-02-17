import {Shape} from "react-konva";
import useSettingsValue from "../../hooks/Utils/useSettings.ts";

interface CanvasGridProps {
    cellSize: number; // inches
    color: string;
}

export default function GridRenderer(props: CanvasGridProps) {
    const {fieldWidth, fieldHeight, showGrid} = useSettingsValue();

    if (!showGrid)
        return null;
    return (
        <Shape
            sceneFunc={(ctx, shape) => {
                ctx.beginPath();
                for (let x = -fieldWidth / 2; x <= fieldWidth / 2; x += props.cellSize) {
                    ctx.moveTo(x, -fieldHeight / 2);
                    ctx.lineTo(x, fieldHeight / 2);
                }
                for (let y = -fieldHeight / 2; y <= fieldHeight / 2; y += props.cellSize) {
                    ctx.moveTo(-fieldWidth / 2, y);
                    ctx.lineTo(fieldWidth / 2, y);
                }
                ctx.fillStrokeShape(shape);
            }}
            fill={props.color}
            stroke={props.color}
            opacity={0.7}
            strokeWidth={0.15}
            perfectDrawEnabled={false}
            isListening={false}
        />
    );
}