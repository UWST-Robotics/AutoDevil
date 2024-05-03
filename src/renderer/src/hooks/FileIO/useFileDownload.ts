import { atom, useSetAtom } from "jotai";
import { pathEncoderAtom } from "./usePathEncoder.ts";
import { settingsAtom } from "../Utils/useSettings.ts";
import { occupancyEncoderAtom } from "./useOccupancyEncoder.ts";

export interface PathDownloadPayload {
    saveAs?: boolean;
}

export const fileDownloadAtom = atom(null, (get, _, payload?: PathDownloadPayload) => {

    const settings = get(settingsAtom);
    const fileContent = settings.showOccupancyGrid ? get(occupancyEncoderAtom) : get(pathEncoderAtom);

    if (electronAPI) {
        // Download file using electron API
        console.log("Downloading using electron API");
        if (payload?.saveAs ?? true)
            electronAPI.saveAs(fileContent);
        else
            electronAPI.save(fileContent);
    } else {
        // Download file using browser API
        console.log("Downloading using browser API");
        const blob = new Blob([fileContent], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = settings.showOccupancyGrid ? "occupancy.txt" : "path.txt";
        a.click();
        URL.revokeObjectURL(url);
    }
});

export default function useFileDownload() {
    return useSetAtom(fileDownloadAtom);
}