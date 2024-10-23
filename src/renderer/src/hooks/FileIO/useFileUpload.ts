import {atom, useSetAtom} from "jotai";
import {fileDeserializerAtom} from "./useFileDeserializer.ts";
import {saveHistoryAtom} from "../Utils/useUndoHistory.ts";

export interface UploadPayload {
    // TODO: Add payload
}

export const fileUploadAtom = atom(null, (_, set, _payload?: UploadPayload) => {
    const readFileContent = (fileContent: string) => {
        set(fileDeserializerAtom, fileContent);
        set(saveHistoryAtom);
    }

    if (electronAPI) {
        console.log("Uploading using electron API");
        electronAPI.open().then(readFileContent);
    } else {
        console.log("Uploading using browser API");
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".txt";
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file)
                return;

            const reader = new FileReader();
            reader.onload = () => {
                const fileContent = reader.result as string;
                readFileContent(fileContent);
            };
            reader.readAsText(file);
        }
        input.click();
    }
});

export default function useFileUpload() {
    return useSetAtom(fileUploadAtom);
}