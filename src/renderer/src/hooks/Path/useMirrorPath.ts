import useSettingsValue from "../Utils/useSettings.ts";
import {useAutoData} from "../AutoData/useAutoData.ts";
import useSaveUndoHistory from "../Utils/useUndoHistory.ts";

export default function useMirrorPath() {
    const {normalizeRotation} = useSettingsValue();
    const [autoData, setAutoData] = useAutoData();
    const savePathHistory = useSaveUndoHistory();

    // TODO: FIX ME

    // return React.useCallback((vertical?: boolean) => {
    //     let newPoints = autoData.points.map((p) => ({
    //         ...p,
    //         x: vertical ? p.x : -p.x,
    //         y: vertical ? -p.y : p.y,
    //         r: vertical ? -p.r : Math.PI - p.r
    //     }));
    //
    //     if (normalizeRotation) {
    //         newPoints = newPoints.map((p) => ({
    //             ...p,
    //             r: normalizeRadians(p.r)
    //         }));
    //     }
    //
    //     setPath({
    //         ...path,
    //         points: newPoints,
    //     });
    //     savePathHistory();
    // }, [path, setPath, savePathHistory]);
}