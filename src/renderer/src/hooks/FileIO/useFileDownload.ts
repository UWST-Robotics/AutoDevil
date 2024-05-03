import { atom, useSetAtom } from "jotai";
import { pathEncoderAtom } from "./usePathEncoder.ts";
import { settingsAtom } from "../Utils/useSettings.ts";
import { occupancyEncoderAtom } from "./useOccupancyEncoder.ts";

export interface PathDownloadPayload {
    // TODO: Add payload
}

export const fileDownloadAtom = atom(null, (get, _, _payload?: PathDownloadPayload) => {
    const settings = get(settingsAtom);
    const fileContent = settings.showOccupancyGrid ? get(occupancyEncoderAtom) : get(pathEncoderAtom);
    const blob = new Blob([fileContent], { type: "text/plain" });
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