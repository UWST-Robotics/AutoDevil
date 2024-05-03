import { contextBridge, ipcRenderer } from 'electron';

const electronAPI = {

    // Renderer >> Electron Functions
    save: (data: string) => ipcRenderer.send('save', data),
    saveAs: (data: string) => ipcRenderer.send('saveAs', data),
    open: () => ipcRenderer.invoke('open'),

    // Electron >> Renderer Listeners
    onSave: (callback: () => void) => ipcRenderer.on('onSave', callback),
    onSaveAs: (callback: () => void) => ipcRenderer.on('onSaveAs', callback),
    onOpen: (callback: () => void) => ipcRenderer.on('onOpen', callback),
    onUndo: (callback: () => void) => ipcRenderer.on('onUndo', callback),
    onRedo: (callback: () => void) => ipcRenderer.on('onRedo', callback),
    onRotateCW: (callback: () => void) => ipcRenderer.on('onRotateCW', callback),
    onRotateCCW: (callback: () => void) => ipcRenderer.on('onRotateCCW', callback),
    onMirrorHorizontal: (callback: () => void) => ipcRenderer.on('onMirrorHorizontal', callback),
    onMirrorVertical: (callback: () => void) => ipcRenderer.on('onMirrorVertical', callback),
    onAbout: (callback: () => void) => ipcRenderer.on('onAbout', callback),
    onToggleGrid: (callback: () => void) => ipcRenderer.on('onToggleGrid', callback),
    onToggleSnap: (callback: () => void) => ipcRenderer.on('onToggleSnap', callback),
    onToggleSnapRotation: (callback: () => void) => ipcRenderer.on('onToggleSnapRotation', callback),

    // Remove Listeners (For React Unmounting)
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
        ipcRenderer.removeAllListeners('onAbout');
        ipcRenderer.removeAllListeners('onToggleGrid');
        ipcRenderer.removeAllListeners('onToggleSnap');
        ipcRenderer.removeAllListeners('onToggleSnapRotation');
    }
};
contextBridge.exposeInMainWorld('electronAPI', electronAPI);

type ElectronAPI = typeof electronAPI;
export default ElectronAPI;