import { Shape } from "react-konva";
import useSettingsValue from "../../hooks/Utils/useSettings.ts";

interface CanvasGridProps {
    cellSize: number; // inches
    color: string;
}

export default function GridRenderer(props: CanvasGridProps) {
    const { fieldWidth, fieldHeight, pixelsPerInch, showGrid } = useSettingsValue();

    if (!showGrid)
        return null;
    return (
        <Shape
            sceneFunc={(ctx, shape) => {
                ctx.beginPath();
                for (let x = -fieldWidth / 2; x <= fieldWidth / 2; x += props.cellSize) {
                    ctx.moveTo(x * pixelsPerInch, -fieldHeight / 2 * pixelsPerInch);
                    ctx.lineTo(x * pixelsPerInch, fieldHeight / 2 * pixelsPerInch);
                }
                for (let y = -fieldHeight / 2; y <= fieldHeight / 2; y += props.cellSize) {
                    ctx.moveTo(-fieldWidth / 2 * pixelsPerInch, y * pixelsPerInch);
                    ctx.lineTo(fieldWidth / 2 * pixelsPerInch, y * pixelsPerInch);
                }
                ctx.fillStrokeShape(shape);
            }}
            fill={props.color}
            stroke={props.color}
            opacity={0.7}
            strokeWidth={1}
            perfectDrawEnabled={false}
            isListening={false}
        />
    );
}