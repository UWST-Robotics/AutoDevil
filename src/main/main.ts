import {app, BrowserWindow, ipcMain, Menu} from 'electron'
import * as Path from "path";
import assignEvents from "./eventHandler.ts";
import icon from '../../build/icon.png'

const isMac = process.platform === 'darwin'
let mainWindow: BrowserWindow | undefined

function createWindow() {
    // Create the browser window
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        useContentSize: true,
        autoHideMenuBar: true,
        icon: icon,
        webPreferences: {
            preload: Path.join(__dirname, '../preload/preload.js')
        }
    })

    // Create the menu
    const menu = Menu.buildFromTemplate([
        {
            label: "File",
            submenu: [
                {
                    label: "Save",
                    accelerator: "CmdOrCtrl+S",
                    click: () => mainWindow?.webContents.send('onSave')
                },
                {
                    label: "Save As",
                    accelerator: "CmdOrCtrl+Shift+S",
                    click: () => mainWindow?.webContents.send('onSaveAs')
                },
                {
                    label: "Open",
                    accelerator: "CmdOrCtrl+O",
                    click: () => mainWindow?.webContents.send('onOpen')
                },
                {type: "separator"},
                isMac ? {
                    role: "close",
                    accelerator: "CmdOrCtrl+W"
                } : {
                    role: "quit",
                    accelerator: "CmdOrCtrl+Q"
                },
            ]
        },
        {
            label: "Edit",
            submenu: [
                {
                    label: "Delete",
                    accelerator: "Delete",
                    click: () => mainWindow?.webContents.send('onDelete')
                },
                {type: "separator"},
                {
                    label: "Rotate CW",
                    accelerator: "CmdOrCtrl+R",
                    click: () => mainWindow?.webContents.send('onRotateCW')
                },
                {
                    label: "Rotate CCW",
                    accelerator: "CmdOrCtrl+Shift+R",
                    click: () => mainWindow?.webContents.send('onRotateCCW')
                },
                {type: "separator"},
                {
                    label: "Mirror Horizontal",
                    accelerator: "CmdOrCtrl+H",
                    click: () => mainWindow?.webContents.send('onMirrorHorizontal')
                },
                {
                    label: "Mirror Vertical",
                    accelerator: "CmdOrCtrl+Shift+H",
                    click: () => mainWindow?.webContents.send('onMirrorVertical')
                },
                {type: "separator"},
                {
                    label: "Undo",
                    accelerator: "CmdOrCtrl+Z",
                    click: () => mainWindow?.webContents.send('onUndo')
                },
                {
                    label: "Redo",
                    accelerator: "CmdOrCtrl+Y",
                    click: () => mainWindow?.webContents.send('onRedo')
                }
            ]
        },
        {
            label: "View",
            submenu: [
                {
                    label: "Toggle Grid",
                    accelerator: "CmdOrCtrl+G",
                    click: () => mainWindow?.webContents.send('onToggleGrid')
                },
                {
                    label: "Toggle Snap Position",
                    accelerator: "CmdOrCtrl+Shift+G",
                    click: () => mainWindow?.webContents.send('onToggleSnap')
                },
                {
                    label: "Toggle Snap Rotation",
                    accelerator: "CmdOrCtrl+Alt+G",
                    click: () => mainWindow?.webContents.send('onToggleSnapRotation')
                },
                {type: "separator"},
                {
                    label: "Fullscreen",
                    accelerator: "F11",
                    click: () => {
                        if (mainWindow)
                            mainWindow.fullScreen = !mainWindow.fullScreen
                    }
                }
            ]
        },
        {
            label: "Help",
            submenu: [
                {
                    label: "About",
                    click: () => {
                        mainWindow?.webContents.send('onAbout')
                    }
                }
            ]
        }
    ])
    Menu.setApplicationMenu(menu)

    // Load Renderer
    if (!app.isPackaged && process.env['ELECTRON_RENDERER_URL']) {
        // Developer Mode
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
        mainWindow.webContents.openDevTools()
    } else {
        // Production Mode
        mainWindow.loadFile(Path.join(__dirname, '../renderer/index.html'))
        mainWindow.webContents.openDevTools()
    }

    // Emitted when the window is closed
    mainWindow.on('closed', () => {
        mainWindow = undefined
    })
}

app.whenReady().then(() => {
    // Set the App User Model ID to prevent Windows from grouping the app with other Electron apps
    app.setAppUserModelId("org.devilbots.AutoDevil")

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