import { atom, useSetAtom } from "jotai";
import { pathEncoderAtom } from "./usePathEncoder.ts";

export interface PathDownloadPayload {
    // TODO: Add payload
}

export const pathDownloadAtom = atom(null, (get, _, _payload?: PathDownloadPayload) => {
    const fileContent = get(pathEncoderAtom);
    const blob = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "path.txt";
    a.click();
    URL.revokeObjectURL(url);
});

export default function usePathDownload() {
    return useSetAtom(pathDownloadAtom);
}