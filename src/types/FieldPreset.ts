export default interface FieldPreset {
    name: string;
    type: string;
    fieldImage: string;
    pixelsPerInch: number;
    fieldWidth: number;
    fieldHeight: number;
}

// Template
const VEX_PUSH_BACK: FieldPreset = {
    name: "VEX Push Back",
    type: "2025-26",
    fieldWidth: 144,
    fieldHeight: 144,
    pixelsPerInch: 13.05,
    fieldImage: "/fields/VEX-Push-Back_Empty.png",
};

export const FIELD_PRESETS: FieldPreset[] = [
    {
        ...VEX_PUSH_BACK,
        name: "VEX Push Back (Match)",
        fieldImage: "/fields/VEX-Push-Back_Match.png",
    },
    {
        name: "VEX High Stakes",
        type: "2024-25",
        fieldWidth: 144,
        fieldHeight: 144,
        pixelsPerInch: 6.6,
        fieldImage: "/fields/VEX-High-Stakes_Empty.png",
    },
    {
        name: "VEX Over Under",
        type: "2023-24",
        fieldWidth: 144,
        fieldHeight: 144,
        pixelsPerInch: 6.6,
        fieldImage: "/fields/VEX-Over-Under_Empty.png",
    }
];

export const DEFAULT_FIELD_PRESET: FieldPreset = FIELD_PRESETS[0];