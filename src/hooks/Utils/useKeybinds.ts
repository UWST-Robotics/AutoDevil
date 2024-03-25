import useDeletePoint from "../Point/useDeletePoint.ts";
import { useSelectedPointValue } from "../Point/useSelectPoint.ts";
import { useRedoChanges, useUndoChanges } from "./useUndoHistory.ts";
import React from "react";

export default function useKeybinds() {
    const deletePoint = useDeletePoint();
    const selectedPointID = useSelectedPointValue();
    const [, undo] = useUndoChanges();
    const [, redo] = useRedoChanges();

    // Handle keydown events
    const onKeyDown = React.useCallback((e: KeyboardEvent) => {
        if (e.key === "Delete")
            deletePoint(selectedPointID);

        if (e.key === "z" && e.ctrlKey)
            undo();
        if (e.key === "y" && e.ctrlKey)
            redo();
    }, [deletePoint, selectedPointID, undo, redo]);

    // Add event listeners
    React.useEffect(() => {
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);

    return null;
}