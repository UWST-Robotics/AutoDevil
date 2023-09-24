import { KonvaEventObject } from "konva/lib/Node";
import React from "react";

export default function useCursorListener(cursor: string) {
    const onMouseOver = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        const stage = e.target.getStage();
        if (stage)
            stage.container().style.cursor = cursor;
    }, [cursor]);

    const onMouseOut = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        const stage = e.target.getStage();
        if (stage)
            stage.container().style.cursor = "default";
    }, []);

    return {
        onMouseOver,
        onMouseOut
    };
}