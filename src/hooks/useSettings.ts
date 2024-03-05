import Settings from "../types/Settings.ts";
import { useAtom, useAtomValue } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const DEFAULT_SETTINGS: Settings = {
    fieldImage: "./default-field.png",
    pixelsPerInch: 6.6,
    robotWidth: 15,
    robotHeight: 15,
    isHolonomic: false,
    isSpline: true,
    snapRotation: true,
    snapPosition: false,
};

export const pathSettingsAtom = atomWithStorage<Settings>("settings", {});

export function useSettings() {
    return useAtom(pathSettingsAtom);
}

export default function useSettingsValue() {
    return useAtomValue(pathSettingsAtom);
}