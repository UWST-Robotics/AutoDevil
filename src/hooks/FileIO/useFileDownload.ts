import {atom, useSetAtom} from "jotai";
import {autoDataAtom} from "../AutoData/useAutoData.ts";
import serializeAutoData from "../../utils/serialization/serializeAutoData.ts";

export const fileDownloadAtom = atom(null, (get) => {
    // Get Serialized file content
    const autoData = get(autoDataAtom);
    const blob = serializeAutoData(autoData);
    const url = URL.createObjectURL(blob);

    // Download it as a file
    const a = document.createElement("a");
    a.href = url;
    a.download = `${autoData.name || "auto"}.json`;
    a.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
});

export default function useFileDownload() {
    return useSetAtom(fileDownloadAtom);
}