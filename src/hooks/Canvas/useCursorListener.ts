import {KonvaEventObject} from "konva/lib/Node";
import React from "react";
import Konva from "konva";

export default function useCursorListener(cursor: string) {
    const stageRef = React.useRef<Konva.Stage | null>(null);
    const [isHovered, setIsHovered] = React.useState(false);

    React.useEffect(() => {
        if (stageRef.current)
            stageRef.current.container().style.cursor = isHovered ? cursor : "default";
    }, [isHovered, cursor]);

    const onMouseOver = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        setIsHovered(true);
        if (!stageRef.current)
            stageRef.current = e.target.getStage();
    }, [cursor]);

    const onMouseOut = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        setIsHovered(false);
        if (!stageRef.current)
            stageRef.current = e.target.getStage();
    }, []);

    return [
        onMouseOver,
        onMouseOut,
        isHovered
    ] as const;
}