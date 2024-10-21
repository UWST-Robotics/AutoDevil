import {atom, useSetAtom} from "jotai";
import {rawAutoDataAtom} from "../AutoData/useAutoData.ts";
import {settingsAtom} from "../Utils/useSettings.ts";

export const occupancyDecoderAtom = atom(null, (get, set, fileContent: string) => {

    // Divide File Content
    const lines = fileContent.split("\n");

    // Reset Grid
    const autoData = get(rawAutoDataAtom);
    autoData.occupancyGrid = [];

    // Parse Each Row
    lines.forEach((line) => {
        if (line.startsWith("OCCUPANCY")) {
            if (line.startsWith("OCCUPANCY 1"))
                return;
            throw new Error("Only OCCUPANCY 1 is supported");
        } else if (line.startsWith("ENDOCCUPANCY") || line === "") {
            // Ignore
        } else {
            const row = line.split("").map((cell) => cell === "1");
            autoData.occupancyGrid.push(row);
        }
    });

    // Calculate Inches/Cell
    const settings = get(settingsAtom);

    const fieldWidth = settings.fieldWidth;
    const fieldHeight = settings.fieldHeight;

    const gridWidth = autoData.occupancyGrid[0].length;
    const gridHeight = autoData.occupancyGrid.length;

    const inchesPerCellX = fieldWidth / gridWidth;
    const inchesPerCellY = fieldHeight / gridHeight;

    if (inchesPerCellX !== inchesPerCellY)
        console.warn("Occupancy dimensions do not match field dimensions");

    // Set File
    set(rawAutoDataAtom, {...autoData});

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