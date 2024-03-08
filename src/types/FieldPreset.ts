export default interface FieldPreset {
    name: string;
    type: string;
    fieldImage: string;
    pixelsPerInch: number;
}

export const FIELD_PRESETS: FieldPreset[] = [
    {
        name: "VEX Over Under (2024)",
        type: "Empty",
        fieldImage: "/fields/VEX-Over-Under_Empty.png",
        pixelsPerInch: 6.6,
    },
    {
        name: "VEX Over Under (2024)",
        type: "Match",
        fieldImage: "/fields/VEX-Over-Under_Match.png",
        pixelsPerInch: 6.6,
    },
    {
        name: "VEX Over Under (2024)",
        type: "Skills",
        fieldImage: "/fields/VEX-Over-Under_Skills.png",
        pixelsPerInch: 6.6,
    },
    {
        name: "VEX Over Under (2024)",
        type: "VEX-U",
        fieldImage: "/fields/VEX-Over-Under_VexU.png",
        pixelsPerInch: 6.6,
    }
];

export const DEFAULT_FIELD_PRESET: FieldPreset = FIELD_PRESETS[0];