import { atom, useAtomValue } from "jotai";
import { settingsAtom } from "../Utils/useSettings.ts";
import { unwrap } from "jotai/utils";

export const fieldImageAtom = atom(async (get) => {

    // Load image
    const settings = get(settingsAtom);
    const image = new window.Image();
    image.src = settings.fieldImage;

    // Wait for image to load
    await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
    });

    return image;
});

export const syncFieldImageAtom = unwrap(fieldImageAtom, p => p);

export default function useFieldImage() {
    return useAtomValue(syncFieldImageAtom);
}