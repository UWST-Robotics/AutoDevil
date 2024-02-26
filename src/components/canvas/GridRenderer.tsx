import { Shape } from "react-konva";
import useWindowScaleValue from "../../hooks/Canvas/useWindowScale.ts";
import useWindowSize from "../../hooks/Canvas/useWindowSize.ts";
import React from "react";

interface CanvasGridProps {
    cellSize: number;
    color: string;
}

const MIN_CELL_SIZE = 10;

export default function GridRenderer(props: CanvasGridProps) {
    const [windowWidth, windowHeight] = useWindowSize();
    const windowScale = useWindowScaleValue();

    const gridSize = React.useMemo(() => {
        const size = Math.ceil((Math.max(windowWidth, windowHeight) / windowScale) / props.cellSize);
        return size + (size % 2);
    }, [windowWidth, windowHeight, windowScale, props.cellSize]);

    console.log(gridSize);

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