import useDeletePoint from "../Point/useDeletePoint.ts";
import { useSelectedPointValue } from "../Point/useSelectPoint.ts";
import { useRedoPath, useUndoPath } from "./useUndoHistory.ts";
import React from "react";

export default function useKeybinds() {
    const deletePoint = useDeletePoint();
    const selectedPointID = useSelectedPointValue();
    const [, undo] = useUndoPath();
    const [, redo] = useRedoPath();
    
    const onKeyDown = React.useCallback((e: KeyboardEvent) => {
        if (e.key === "Delete" && selectedPointID)
            deletePoint(selectedPointID);
        if (e.key === "z" && e.ctrlKey)
            undo();
        if (e.key === "y" && e.ctrlKey)
            redo();
    }, [deletePoint, selectedPointID, undo, redo]);

    React.useEffect(() => {
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
        }
    }, [onKeyDown]);

    return null;
}