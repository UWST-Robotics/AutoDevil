import { app, BrowserWindow, ipcMain } from 'electron'
import { openFile, saveFileAs } from './fileAPI'

let mainWindow: BrowserWindow | undefined

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        useContentSize: true,
        icon: 'src/renderer/public/android-chrome-192x192.png',
    })

    mainWindow.loadURL('http://localhost:3000')
    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', () => {
        mainWindow = undefined
    })
}

app.whenReady().then(() => {
    // Register the handlers for the dialog events
    ipcMain.handle('dialog:saveAs', saveFileAs)
    ipcMain.handle('dialog:open', openFile)

    // Create the main window
    createWindow()
});

app.on('window-all-closed', () => {
    // MacOS convention is to keep the app running even if all windows are closed
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // Recreate the main window in the app when the dock icon is clicked and no other windows are open
    if (!mainWindow)
        createWindow()
})