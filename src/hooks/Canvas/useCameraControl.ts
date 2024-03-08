import React from "react";
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";

export default function useCameraControl() {
    const [x, setX] = React.useState(0);
    const [y, setY] = React.useState(0);
    const [scale, setScale] = React.useState(1);

    React.useEffect(() => {
        Konva.dragButtons = [0, 1, 2];
        Konva.hitOnDragEnabled = true;
    }, []);

    const onScroll = React.useCallback((e: KonvaEventObject<WheelEvent>) => {
        e.evt.preventDefault();
        setScale(scale => scale * (1 - e.evt.deltaY / 1000));
    }, []);

    const onMouseDown = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        if (e.evt.button === 2) {
            e.target.getStage()?.startDrag();
            e.evt.preventDefault();
        }
    }, []);

    const onMouseUp = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        if (e.evt.button === 2) {
            e.target.getStage()?.stopDrag();
            e.evt.preventDefault();
        }
    }, []);

    const onDragEnd = React.useCallback((e: KonvaEventObject<DragEvent>) => {
        if (e.target === e.target.getStage()) {
            setX(e.target.x());
            setY(e.target.y());
        }
    }, []);

    const onContextMenu = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        e.evt.preventDefault();
    }, []);

    return {
        x,
        y,
        scale,
        onScroll,
        onMouseDown,
        onMouseUp,
        onDragEnd,
        onContextMenu
    };
}