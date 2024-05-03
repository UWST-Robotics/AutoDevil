import useSettingsValue from "../Utils/useSettings.ts";
import { useAutoData } from "../Utils/useAutoData.ts";
import useSaveUndoHistory from "../Utils/useUndoHistory.ts";
import React from "react";
import { normalizeRadians } from "../../utils/toDegrees.ts";

export default function useRotatePath() {
    const { normalizeRotation } = useSettingsValue();
    const [path, setPath] = useAutoData();
    const savePathHistory = useSaveUndoHistory();

    return React.useCallback((clockwise?: boolean) => {
        let newPoints = path.points.map((p) => ({
            ...p,
            x: clockwise ? -p.y : p.y,
            y: clockwise ? p.x : -p.x,
            r: clockwise ? p.r + Math.PI / 2 : p.r - Math.PI / 2
        }));

        if (normalizeRotation) {
            newPoints = newPoints.map((p) => ({
                ...p,
                r: normalizeRadians(p.r)
            }));
        }

        setPath({
            ...path,
            points: newPoints,
        });
        savePathHistory();
    }, [path, setPath, savePathHistory]);
}