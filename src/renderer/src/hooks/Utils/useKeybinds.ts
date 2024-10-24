import {useRedoChanges, useUndoChanges} from "./useUndoHistory.ts";
import React from "react";
import useDeleteSelectedAutoStep from "../AutoSteps/actions/useDeleteSelectedAutoStep.ts";

export default function useKeybinds() {
    const [, undo] = useUndoChanges();
    const [, redo] = useRedoChanges();
    const deleteSelectedAutoStep = useDeleteSelectedAutoStep();

    // Handle keydown events
    const onKeyDown = React.useCallback((e: KeyboardEvent) => {
        if (e.key === "Delete")
            deleteSelectedAutoStep();

        if (e.key === "z" && e.ctrlKey)
            undo();
        if (e.key === "y" && e.ctrlKey)
            redo();
    }, [undo, redo]);

    // Add event listeners
    React.useEffect(() => {

        // Electron implements its own keybinds
        if (electronAPI)
            return;

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);

    return null;
}