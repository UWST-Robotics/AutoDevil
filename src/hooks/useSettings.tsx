import Settings from "../types/Settings.ts";
import { atom, useAtom, useAtomValue } from 'jotai';

const defaultPathSettings: Settings = {
    imageData: "/default-field.jpg",
    pixelsPerInch: 6
};

export const pathSettingsAtom = atom(defaultPathSettings);

export function useSettings() {
    return useAtom(pathSettingsAtom);
}

export default function useSettingsValue() {
    return useAtomValue(pathSettingsAtom);
}