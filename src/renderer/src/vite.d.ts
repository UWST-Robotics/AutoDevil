/// <reference types="vite/client" />
/// <reference types="electron-vite/env" />
declare const electronAPI: {
    // See src/preload/preload.ts for the full API
    save: (data: string) => void,
    saveAs: (data: string) => void,
    open: () => Promise<string>,

    onSave: (callback: () => void) => void,
    onSaveAs: (callback: () => void) => void,
    onOpen: (callback: () => void) => void,
    onUndo: (callback: () => void) => void,
    onRedo: (callback: () => void) => void,
    onRotateCW: (callback: () => void) => void,
    onRotateCCW: (callback: () => void) => void,
    onMirrorHorizontal: (callback: () => void) => void,
    onMirrorVertical: (callback: () => void) => void,

    removeAllListeners: () => void,

} | undefined
declare const APP_VERSION: string