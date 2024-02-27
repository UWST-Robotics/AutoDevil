import Settings from "../types/Settings.ts";
import { atom, useAtom, useAtomValue } from 'jotai';

export const DEFAULT_SETTINGS: Settings = {
    fieldImage: "./default-field.png",
    pixelsPerInch: 6.6,
    robotWidth: 15,
    robotHeight: 15,
    isHolonomic: false,
    isSpline: true
};

export const pathSettingsAtom = atom(DEFAULT_SETTINGS);

export function useSettings() {
    return useAtom(pathSettingsAtom);
}

export default function useSettingsValue() {
    return useAtomValue(pathSettingsAtom);
}