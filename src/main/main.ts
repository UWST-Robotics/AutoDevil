import { app, BrowserWindow, ipcMain, Menu } from 'electron'
import * as Path from "path";
import assignEvents from "./eventHandler.ts";

const isMac = process.platform === 'darwin'
let mainWindow: BrowserWindow | undefined

function createWindow() {
    // Create the browser window
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        useContentSize: true,
        icon: 'src/renderer/public/android-chrome-192x192.png',
        webPreferences: {
            preload: Path.join(app.getAppPath(), 'out/preload/preload.js'),
        }
    })

    // Create the menu
    const menu = Menu.buildFromTemplate([
        {
            label: "File",
            submenu: [
                {
                    label: "Save",
                    click: () => mainWindow?.webContents.send('onSave')
                },
                {
                    label: "Save As",
                    click: () => mainWindow?.webContents.send('onSaveAs')
                },
                {
                    label: "Open",
                    click: () => mainWindow?.webContents.send('onOpen')
                },
                isMac ? { role: "close" } : { role: "quit" },
            ]
        },
        {
            label: "Edit",
            submenu: [
                {
                    label: "Rotate CW",
                    click: () => mainWindow?.webContents.send('onRotateCW')
                },
                {
                    label: "Rotate CCW",
                    click: () => mainWindow?.webContents.send('onRotateCCW')
                },
                {
                    label: "Mirror Horizontal",
                    click: () => mainWindow?.webContents.send('onMirrorHorizontal')
                },
                {
                    label: "Mirror Vertical",
                    click: () => mainWindow?.webContents.send('onMirrorVertical')
                },
                {
                    label: "Undo",
                    click: () => mainWindow?.webContents.send('onUndo')
                },
                {
                    label: "Redo",
                    click: () => mainWindow?.webContents.send('onRedo')
                }
            ]
        }
    ])
    Menu.setApplicationMenu(menu)

    // Load local Vite instance
    mainWindow.loadURL('http://localhost:3000')
    mainWindow.webContents.openDevTools()

    // Emitted when the window is closed
    mainWindow.on('closed', () => {
        mainWindow = undefined
    })
}

app.whenReady().then(() => {
    // Register the handlers for the dialog events
    assignEvents(ipcMain)

    // Create the main window
    createWindow()
});

app.on('window-all-closed', () => {
    // MacOS convention is to keep the app running even if all windows are closed
    if (!isMac)
        app.quit()
})

app.on('activate', () => {
    // Recreate the main window in the app when the dock icon is clicked and no other windows are open
    if (!mainWindow)
        createWindow()
})