import { DEFAULT_FIELD_PRESET } from "./FieldPreset.ts";

interface Settings {
    fieldImage: string;
    fieldWidth: number;
    fieldHeight: number;
    fieldOpacity: number;
    pixelsPerInch: number;
    robotWidth: number;
    robotHeight: number;
    isHolonomic: boolean;
    isSpline: boolean;
    normalizeRotation: boolean;
    snapRotation: boolean;
    snapPosition: boolean;
    showOccupancyGrid: boolean;
    occupancyInchesPerCell: number;
    showGrid: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
    fieldImage: DEFAULT_FIELD_PRESET.fieldImage,
    fieldWidth: DEFAULT_FIELD_PRESET.fieldWidth,
    fieldHeight: DEFAULT_FIELD_PRESET.fieldHeight,
    fieldOpacity: 0.5,
    pixelsPerInch: DEFAULT_FIELD_PRESET.pixelsPerInch,
    robotWidth: 15,
    robotHeight: 15,
    isHolonomic: false,
    isSpline: true,
    normalizeRotation: true,
    snapRotation: true,
    snapPosition: false,
    showOccupancyGrid: false,
    occupancyInchesPerCell: 6,
    showGrid: true,
};

export default Settings;