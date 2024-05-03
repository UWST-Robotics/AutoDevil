import { dialog } from "electron";
import * as fs from "fs";

let lastSavePath: string | null = null;

/**
 * Shows a dialog to save a file
 * @returns {Promise} Resolves when the file is saved, rejects if the user cancels the dialog
 */
export function saveFileAs(data: string) {
    return dialog.showSaveDialog({
        title: "Save As",
        buttonLabel: "Save",
        filters: [
            { name: "Path Files", extensions: ["txt"] },
            { name: "All Files", extensions: ["*"] }
        ]
    }).then(({ filePath }) => {
        if (filePath)
            saveFileTo(filePath, data);
    });
}

/**
 * Saves a file to the last saved path
 * @param data - The data to save
 */
export function saveFile(data: string) {
    if (lastSavePath) {
        try {
            saveFileTo(lastSavePath, data);
            return Promise.resolve();
        } catch (e) {
            console.error(e);
        }
    }
    return saveFileAs(data);
}

/**
 * Saves a file to the given path
 * @param path - The path to save the file to
 * @param data - The data to save
 */
export function saveFileTo(path: string, data: string) {
    lastSavePath = path;
    fs.writeFileSync(path, data);
}

/**
 * Opens a dialog to open a file
 * @returns {Promise<string>} Resolves with the file content, rejects if the user cancels the dialog
 */
export function openFile() {
    return dialog.showOpenDialog({
        title: "Open",
        buttonLabel: "Open",
        filters: [
            { name: "Path Files", extensions: ["txt"] }
        ]
    }).then(({ filePaths }) => {
        if (filePaths && filePaths.length > 0) {
            lastSavePath = filePaths[0];
            return fs.readFileSync(lastSavePath, "utf-8");
        } else
            throw new Error("No file selected");
    });
}