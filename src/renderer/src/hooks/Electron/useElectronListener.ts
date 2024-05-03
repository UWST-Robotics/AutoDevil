import useFileDownload from "../FileIO/useFileDownload.ts";
import useFileUpload from "../FileIO/useFileUpload.ts";
import React from "react";
import { useRedoChanges, useUndoChanges } from "../Utils/useUndoHistory.ts";
import useMirrorPath from "../Path/useMirrorPath.ts";
import useRotatePath from "../Path/useRotatePath.ts";

/**
 * This hook listens for events from the main process and triggers the appropriate file upload/download functions.
 * Should be called once in the application lifecycle (singleton).
 */
export default function useElectronListener() {
    const downloadFile = useFileDownload();
    const uploadFile = useFileUpload();
    const [, undo] = useUndoChanges();
    const [, redo] = useRedoChanges();
    const mirrorPath = useMirrorPath();
    const rotatePath = useRotatePath();


    React.useEffect(() => {
        electronAPI?.onOpen(uploadFile);
        electronAPI?.onSave(() => downloadFile({ saveAs: false }));
        electronAPI?.onSaveAs(() => downloadFile({ saveAs: true }));
        electronAPI?.onUndo(undo);
        electronAPI?.onRedo(redo);
        electronAPI?.onMirrorHorizontal(() => mirrorPath(false));
        electronAPI?.onMirrorVertical(() => mirrorPath(true));
        electronAPI?.onRotateCW(() => rotatePath(true));
        electronAPI?.onRotateCCW(() => rotatePath(false));

        return electronAPI?.removeAllListeners;
    }, [downloadFile, uploadFile, undo, redo, mirrorPath, rotatePath]);
}