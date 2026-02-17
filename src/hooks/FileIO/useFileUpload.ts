import {atom, useSetAtom} from "jotai";
import {saveHistoryAtom} from "../Utils/useUndoHistory.ts";
import {autoDataAtom} from "../AutoData/useAutoData.ts";
import deserializeAutoData from "../../utils/serialization/deserializeAutoData.ts";

export interface UploadPayload {
    // TODO: Add payload
}

export const fileUploadAtom = atom(null, (_, set, _payload?: UploadPayload) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = () => {

        // Get the selected file
        if (!input.files || input.files.length === 0)
            return;
        const file = input.files[0];

        // Deserialize file and set auto data
        deserializeAutoData(file)
            .then((autoData) => {
                set(autoDataAtom, autoData);
                set(saveHistoryAtom);
            })
            .catch((error) => {
                console.error("Failed to upload file:", error);
                alert("Failed to upload file. Please make sure it's a valid auto file.");
            });
    }
    input.click();
});

export default function useFileUpload() {
    return useSetAtom(fileUploadAtom);
}