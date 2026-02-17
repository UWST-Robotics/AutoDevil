import {DEFAULT_FIELD_PRESET} from "./FieldPreset.ts";

interface Settings {
    // Field
    fieldImage: string;
    fieldWidth: number;
    fieldHeight: number;
    fieldOpacity: number;
    pixelsPerInch: number;

    // Robot
    robotWidth: number;
    robotHeight: number;
    robotSafeRadius: number;
    isHolonomic: boolean;

    // Grid/Snap
    showEdgeTrail: boolean;
    showGrid: boolean;
    snapRotation: boolean;
    snapPosition: boolean;
    normalizeRotation: boolean;

    // Output
    numberOfDecimalPlaces: number;
}

export const DEFAULT_SETTINGS: Settings = {
    // Field
    fieldImage: DEFAULT_FIELD_PRESET.fieldImage,
    fieldWidth: DEFAULT_FIELD_PRESET.fieldWidth,
    fieldHeight: DEFAULT_FIELD_PRESET.fieldHeight,
    fieldOpacity: 0.5,
    pixelsPerInch: DEFAULT_FIELD_PRESET.pixelsPerInch,

    // Robot
    robotWidth: 18,
    robotHeight: 18,
    robotSafeRadius: 4,
    isHolonomic: false,

    // Grid/Snap
    showEdgeTrail: false,
    showGrid: true,
    snapRotation: true,
    snapPosition: false,
    normalizeRotation: true,

    // Output
    numberOfDecimalPlaces: 3
};

export default Settings;