import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    // File API
    save: (data: string) => ipcRenderer.send('save', data),
    saveAs: (data: string) => ipcRenderer.send('saveAs', data),
    open: () => ipcRenderer.invoke('open'),

    // Menu Callbacks
    onSave: (callback: () => void) => ipcRenderer.on('onSave', callback),
    onSaveAs: (callback: () => void) => ipcRenderer.on('onSaveAs', callback),
    onOpen: (callback: () => void) => ipcRenderer.on('onOpen', callback),
    onUndo: (callback: () => void) => ipcRenderer.on('onUndo', callback),
    onRedo: (callback: () => void) => ipcRenderer.on('onRedo', callback),
    onRotateCW: (callback: () => void) => ipcRenderer.on('onRotateCW', callback),
    onRotateCCW: (callback: () => void) => ipcRenderer.on('onRotateCCW', callback),
    onMirrorHorizontal: (callback: () => void) => ipcRenderer.on('onMirrorHorizontal', callback),
    onMirrorVertical: (callback: () => void) => ipcRenderer.on('onMirrorVertical', callback),

    removeAllListeners: () => {
        ipcRenderer.removeAllListeners('onSave');
        ipcRenderer.removeAllListeners('onSaveAs');
        ipcRenderer.removeAllListeners('onOpen');
        ipcRenderer.removeAllListeners('onUndo');
        ipcRenderer.removeAllListeners('onRedo');
        ipcRenderer.removeAllListeners('onRotateCW');
        ipcRenderer.removeAllListeners('onRotateCCW');
        ipcRenderer.removeAllListeners('onMirrorHorizontal');
        ipcRenderer.removeAllListeners('onMirrorVertical');
    }
});