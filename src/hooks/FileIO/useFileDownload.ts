import {atom, useSetAtom} from "jotai";
import {fileSerializerAtom} from "./useFileSerializer.ts";
import {settingsAtom} from "../Utils/useSettings.ts";

export const fileDownloadAtom = atom(null, (get, _) => {

    const settings = get(settingsAtom);
    const fileContent = get(fileSerializerAtom);

    // Download file using browser API
    console.log("Downloading using browser API");
    const blob = new Blob([fileContent], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = settings.showOccupancyGrid ? "occupancy.txt" : "path.txt";
    a.click();
    URL.revokeObjectURL(url);
});

export default function useFileDownload() {
    return useSetAtom(fileDownloadAtom);
}