import { openFile, saveFile, saveFileAs } from "./fileAPI.ts";

export default function assignEvents(ipcMain: Electron.IpcMain) {
    ipcMain.on('save', (_, data) => saveFile(data).catch(console.error))
    ipcMain.on('saveAs', (_, data) => saveFileAs(data).catch(console.error))
    ipcMain.handle('open', () => openFile().catch(console.error))
}