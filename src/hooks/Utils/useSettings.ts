import Settings, { DEFAULT_SETTINGS } from "../../types/Settings.ts";
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Storage is used to persist the settings between sessions
const settingsStoreAtom = atomWithStorage<Partial<Settings>>("settings", {});

// The pathSettingsAtom is the main atom for the settings. It is a derived atom from the storage atom
export const settingsAtom = atom((get) => {
        const storageSettings = get(settingsStoreAtom);
        return { ...DEFAULT_SETTINGS, ...storageSettings } as Settings;
    },
    (get, set, update: Partial<Settings>) => {
        const storageSettings = get(settingsStoreAtom);
        set(settingsStoreAtom, { ...storageSettings, ...update });
    }
);

export function useSettings() {
    return useAtom(settingsAtom);
}

export default function useSettingsValue() {
    return useAtomValue(settingsAtom);
}

export function useSetSettings() {
    return useSetAtom(settingsAtom);
}