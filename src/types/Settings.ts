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
    fieldImage: "./default-field.png",
    pixelsPerInch: 6.6,
    robotWidth: 15,
    robotHeight: 15,
    isHolonomic: false,
    isSpline: true,
    snapRotation: true,
    snapPosition: false,
};

export default Settings;