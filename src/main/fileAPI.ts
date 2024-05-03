import { dialog } from "electron";

/**
 * Shows a dialog to save a file
 * @returns {Promise<string | undefined>} The path of the file to save or undefined if the user cancels the dialog
 */
export function saveFileAs() {
    return dialog.showSaveDialog({
        title: "Save As",
        buttonLabel: "Save",
        filters: [
            { name: "Path Files", extensions: ["*.txt"] }
        ]
    });
}

/**
 * Opens a dialog to open a file
 * @returns {Promise<string[] | undefined>} The path of the file to open or undefined if the user cancels the dialog
 */
export function openFile() {
    return dialog.showOpenDialog({
        title: "Open",
        buttonLabel: "Open",
        filters: [
            { name: "Path Files", extensions: ["*.txt"] }
        ]
    });
}