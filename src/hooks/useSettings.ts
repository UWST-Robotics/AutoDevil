import Settings from "../types/Settings.ts";
import { atom, useAtom, useAtomValue } from 'jotai';

const defaultPathSettings: Settings = {
    imageData: "/default-field.png",
    pixelsPerInch: 13.888,
    robotWidth: 15,
    robotHeight: 15,
};

export const pathSettingsAtom = atom(defaultPathSettings);

export function useSettings() {
    return useAtom(pathSettingsAtom);
}

export default function useSettingsValue() {
    return useAtomValue(pathSettingsAtom);
}