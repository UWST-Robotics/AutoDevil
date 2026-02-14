export default interface FieldPreset {
    name: string;
    type: string;
    fieldImage: string;
    pixelsPerInch: number;
    fieldWidth: number;
    fieldHeight: number;
}

// Template
const VEX_OVER_UNDER: FieldPreset = {
    name: "VEX Over Under",
    type: "2023-24",
    fieldWidth: 144,
    fieldHeight: 144,
    pixelsPerInch: 6.6,
    fieldImage: "/fields/VEX-Over-Under_Empty.png",
};
const VEX_HIGH_STAKES: FieldPreset = {
    name: "VEX Over Under",
    type: "2024-25",
    fieldWidth: 144,
    fieldHeight: 144,
    pixelsPerInch: 6.6,
    fieldImage: "/fields/VEX-High-Stakes_Empty.png",
};

export const FIELD_PRESETS: FieldPreset[] = [
    {
        ...VEX_HIGH_STAKES,
        name: "Empty",
        fieldImage: "/fields/VEX-High-Stakes_Empty.png",
    },
    {
        ...VEX_HIGH_STAKES,
        name: "VRC Match",
        fieldImage: "/fields/VEX-High-Stakes_Match.png",
    },
    {
        ...VEX_HIGH_STAKES,
        name: "VRC Skills",
        fieldImage: "/fields/VEX-High-Stakes_Skills.png",
    },
    {
        ...VEX_HIGH_STAKES,
        name: "VEX-U Match",
        fieldImage: "/fields/VEX-High-Stakes_VexU.png",
    },
    {
        ...VEX_OVER_UNDER,
        name: "Empty",
        fieldImage: "/fields/VEX-Over-Under_Empty.png",
    },
    {
        ...VEX_OVER_UNDER,
        name: "VRC Match",
        fieldImage: "/fields/VEX-Over-Under_Match.png",
    },
    {
        ...VEX_OVER_UNDER,
        name: "VRC Skills",
        fieldImage: "/fields/VEX-Over-Under_Skills.png",
    },
    {
        ...VEX_OVER_UNDER,
        name: "VEX-U Match",
        fieldImage: "/fields/VEX-Over-Under_VexU.png",
    }
];

export const DEFAULT_FIELD_PRESET: FieldPreset = FIELD_PRESETS[0];