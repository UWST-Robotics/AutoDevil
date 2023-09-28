import { atom, useSetAtom } from "jotai";
import { pathDecoderAtom } from "./usePathDecoder.ts";

export interface PathUploadPayload {
    // TODO: Add payload
}

export const pathUploadAtom = atom(null, (_, set, _payload?: PathUploadPayload) => {
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
            set(pathDecoderAtom, fileContent);
        };
        reader.readAsText(file);
    }
    input.click();
});

export default function usePathUpload() {
    return useSetAtom(pathUploadAtom);
}