import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    saveAs: (data: string) => ipcRenderer.send('saveAs', data),
});