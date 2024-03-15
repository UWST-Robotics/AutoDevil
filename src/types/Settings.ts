import { DEFAULT_FIELD_PRESET } from "./FieldPreset.ts";

interface Settings {
    fieldImage: string;
    pixelsPerInch: number;
    robotWidth: number;
    robotHeight: number;
    isHolonomic: boolean;
    isSpline: boolean;
    snapRotation: boolean;
    snapPosition: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
    fieldImage: DEFAULT_FIELD_PRESET.fieldImage,
    pixelsPerInch: DEFAULT_FIELD_PRESET.pixelsPerInch,
    robotWidth: 15,
    robotHeight: 15,
    isHolonomic: false,
    isSpline: true,
    snapRotation: true,
    snapPosition: false,
};

export default Settings;