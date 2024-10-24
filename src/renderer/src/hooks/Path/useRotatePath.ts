import useSaveUndoHistory from "../Utils/useUndoHistory.ts";
import React from "react";

export default function useRotatePath() {
    const savePathHistory = useSaveUndoHistory();

    return React.useCallback((_?: boolean) => {
        // TODO: Fix me
        // let newPoints = path.points.map((p) => ({
        //     ...p,
        //     x: clockwise ? -p.y : p.y,
        //     y: clockwise ? p.x : -p.x,
        //     r: clockwise ? p.r + Math.PI / 2 : p.r - Math.PI / 2
        // }));
        //
        // if (normalizeRotation) {
        //     newPoints = newPoints.map((p) => ({
        //         ...p,
        //         r: normalizeRadians(p.r)
        //     }));
        // }
        //
        // setPath({
        //     ...path,
        //     points: newPoints,
        // });
        savePathHistory();
    }, [savePathHistory]);
}