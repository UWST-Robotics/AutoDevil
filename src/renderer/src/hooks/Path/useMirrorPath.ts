import useSettingsValue from "../Utils/useSettings.ts";
import {useAutoData} from "../AutoData/useAutoData.ts";
import useSaveUndoHistory from "../Utils/useUndoHistory.ts";
import React from "react";
import {normalizeRadians} from "../../utils/toDegrees.ts";

export default function useMirrorPath() {
    const {normalizeRotation} = useSettingsValue();
    const [path, setPath] = useAutoData();
    const savePathHistory = useSaveUndoHistory();

    return React.useCallback((vertical?: boolean) => {
        let newPoints = path.points.map((p) => ({
            ...p,
            x: vertical ? p.x : -p.x,
            y: vertical ? -p.y : p.y,
            r: vertical ? -p.r : Math.PI - p.r
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