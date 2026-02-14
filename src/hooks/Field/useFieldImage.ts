import { atom, useAtomValue } from "jotai";
import { unwrap } from "jotai/utils";
import { settingsAtom } from "../Utils/useSettings.ts";

export const fieldImageAtom = atom(async (get) => {

    // Load image
    const settings = get(settingsAtom);
    const image = new window.Image();
    image.src = settings.fieldImage;

    // Wait for image to load
    await new Promise((resolve) => {
        image.onload = resolve;
        image.onerror = (e) => console.error('Failed to load image', e);
    });

    return image;
});

export const syncFieldImageAtom = unwrap(fieldImageAtom, p => p);

export default function useFieldImage() {
    return useAtomValue(syncFieldImageAtom);
}