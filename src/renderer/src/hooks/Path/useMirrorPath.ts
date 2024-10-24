import useSaveUndoHistory from "../Utils/useUndoHistory.ts";
import React from "react";

export default function useMirrorPath() {
    const savePathHistory = useSaveUndoHistory();

    return React.useCallback((_?: boolean) => {

        // TODO: FIX ME
        // let newPoints = autoData.points.map((p) => ({
        //     ...p,
        //     x: vertical ? p.x : -p.x,
        //     y: vertical ? -p.y : p.y,
        //     r: vertical ? -p.r : Math.PI - p.r
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