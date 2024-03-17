import { atom, useAtomValue } from "jotai";
import { rawAutoDataAtom } from "../Utils/useAutoData.ts";

export const occupancyEncoderAtom = atom((get) => {
    const { occupancyGrid } = get(rawAutoDataAtom);

    // Add Path Points
    let fileContent = "OCCUPANCY 1\n";
    occupancyGrid.forEach((row) => {
        fileContent += row.map((cell) => cell ? "1" : "0").join("") + "\n";
    });
    fileContent += "ENDOCCUPANCY\n";
    return fileContent;
});

export default function useOccupancyEncoder() {
    return useAtomValue(occupancyEncoderAtom);
}