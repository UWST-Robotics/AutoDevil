import { useRedoChanges, useUndoChanges } from "../../hooks/Utils/useUndoHistory.ts";
import { IconButton } from "@mui/material";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

export interface UndoRedoButtonProps {
    redo?: boolean;
}

export default function UndoRedoButton(props: UndoRedoButtonProps) {
    const [canUndo, undoPath] = useUndoChanges();
    const [canRedo, redoPath] = useRedoChanges();

    return (
        <IconButton
            aria-label={props.redo ? "Redo" : "Undo"}
            onClick={props.redo ? redoPath : undoPath}
            disabled={props.redo ? !canRedo : !canUndo}
        >
            {props.redo ? <RedoIcon /> : <UndoIcon />}
        </IconButton>
    )
}