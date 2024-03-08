import { Shape } from "react-konva";
import useWindowScaleValue from "../../hooks/Canvas/useWindowScale.ts";
import useWindowSize from "../../hooks/Canvas/useWindowSize.ts";
import React from "react";

interface CanvasGridProps {
    cellSize: number;
    color: string;
}

const MIN_CELL_SIZE = 10;
const MAX_GRID_SIZE = 30;
const MIN_GRID_SIZE = 2;

export default function GridRenderer(props: CanvasGridProps) {
    const [windowWidth, windowHeight] = useWindowSize();
    const windowScale = useWindowScaleValue();

    const gridSize = React.useMemo(() => {
        let size = Math.ceil((Math.max(windowWidth, windowHeight) / windowScale) / props.cellSize);
        size = Math.max(Math.min(size, MAX_GRID_SIZE), MIN_GRID_SIZE); // Clamp between MIN_GRID_SIZE and MAX_GRID_SIZE
        size += (size % 2); // Make sure it's odd

        return size;
    }, [windowWidth, windowHeight, windowScale, props.cellSize]);

    if (props.cellSize < MIN_CELL_SIZE)
        return null;
    return (
        <Shape
            sceneFunc={(ctx, shape) => {
                ctx.beginPath();
                for (let x = -gridSize / 2; x <= gridSize / 2; x++) {
                    ctx.moveTo(x * props.cellSize, (-gridSize / 2) * props.cellSize);
                    ctx.lineTo(x * props.cellSize, (gridSize / 2) * props.cellSize);
                }
                for (let y = -gridSize / 2; y <= gridSize / 2; y++) {
                    ctx.moveTo((-gridSize / 2) * props.cellSize, y * props.cellSize);
                    ctx.lineTo((gridSize / 2) * props.cellSize, y * props.cellSize);
                }
                ctx.fillStrokeShape(shape);
            }}
            fill={props.color}
            stroke={props.color}
            opacity={0.7}
            strokeWidth={0.5 / windowScale}
            isListening={false}
        />
    );
}