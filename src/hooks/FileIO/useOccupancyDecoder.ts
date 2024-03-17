import { atom, useSetAtom } from "jotai";
import { DEFAULT_DATA, rawAutoDataAtom } from "../Utils/useAutoData.ts";
import AutoData from "../../types/AutoData.ts";
import { settingsAtom } from "../Utils/useSettings.ts";

export const occupancyDecoderAtom = atom(null, (get, set, fileContent: string) => {

    // Decode File Content
    const lines = fileContent.split("\n");
    const path: AutoData = {
        points: DEFAULT_DATA.points,
        occupancyGrid: [],
    };
    lines.forEach((line) => {
        if (line.startsWith("OCCUPANCY")) {
            if (line.startsWith("OCCUPANCY 1"))
                return;
            throw new Error("Only OCCUPANCY 1 is supported");
        } else if (line.startsWith("ENDOCCUPANCY") || line === "") {
            // Ignore
        } else {
            const row = line.split("").map((cell) => cell === "1");
            path.occupancyGrid.push(row);
        }
    });

    // Calculate Inches/Cell
    const settings = get(settingsAtom);

    const fieldWidth = settings.fieldWidth;
    const fieldHeight = settings.fieldHeight;

    const gridWidth = path.occupancyGrid[0].length;
    const gridHeight = path.occupancyGrid.length;

    const inchesPerCellX = fieldWidth / gridWidth;
    const inchesPerCellY = fieldHeight / gridHeight;

    if (inchesPerCellX !== inchesPerCellY)
        console.warn("Occupancy dimensions do not match field dimensions");

    // Set File
    set(rawAutoDataAtom, path);

    // Update Settings
    set(settingsAtom, {
        ...settings,
        occupancyInchesPerCell: inchesPerCellX,
        showOccupancyGrid: true
    });
});

export default function useOccupancyDecoder() {
    return useSetAtom(occupancyDecoderAtom);
}