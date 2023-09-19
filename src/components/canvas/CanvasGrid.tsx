import { Shape } from "react-konva";

interface CanvasGridProps {
    cellSize: number;
    gridSize: number;
    color: string;
}

export default function CanvasGrid(props: CanvasGridProps) {

    return (
        <Shape
            sceneFunc={(ctx, shape) => {
                ctx.beginPath();
                for (let x = -props.gridSize / 2; x <= props.gridSize / 2; x++) {
                    ctx.moveTo(x * props.cellSize, (-props.gridSize / 2) * props.cellSize);
                    ctx.lineTo(x * props.cellSize, (props.gridSize / 2) * props.cellSize);
                }
                for (let y = -props.gridSize / 2; y <= props.gridSize / 2; y++) {
                    ctx.moveTo((-props.gridSize / 2) * props.cellSize, y * props.cellSize);
                    ctx.lineTo((props.gridSize / 2) * props.cellSize, y * props.cellSize);
                }
                ctx.fillStrokeShape(shape);
            }}
            fill={props.color}
            stroke={props.color}
            opacity={0.7}
            strokeWidth={1}
        />
    );
}