export default interface FieldPreset {
    name: string;
    type: string;
    fieldImage: string;
    pixelsPerInch: number;
}

export const FIELD_PRESETS: FieldPreset[] = [
    {
        name: "Empty Field",
        type: "2024",
        fieldImage: "/fields/VEX-Over-Under_Empty.png",
        pixelsPerInch: 6.6,
    },
    {
        name: "VRC Match",
        type: "2024",
        fieldImage: "/fields/VEX-Over-Under_Match.png",
        pixelsPerInch: 6.6,
    },
    {
        name: "VRC Skills",
        type: "2024",
        fieldImage: "/fields/VEX-Over-Under_Skills.png",
        pixelsPerInch: 6.6,
    },
    {
        name: "VEX-U Match",
        type: "2024",
        fieldImage: "/fields/VEX-Over-Under_VexU.png",
        pixelsPerInch: 6.6,
    }
];

export const DEFAULT_FIELD_PRESET: FieldPreset = FIELD_PRESETS[0];