import { Button } from "@blueprintjs/core";
import { useRedoPath, useUndoPath } from "../../hooks/Utils/useUndoHistory.ts";

export interface UndoRedoButtonProps {
    redo?: boolean;
}

export default function UndoRedoButton(props: UndoRedoButtonProps) {
    const [canUndo, undoPath] = useUndoPath();
    const [canRedo, redoPath] = useRedoPath();

    return (
        <Button
            disabled={props.redo ? !canRedo : !canUndo}
            icon={props.redo ? "redo" : "undo"}
            onClick={props.redo ? redoPath : undoPath}
        />
    )
}