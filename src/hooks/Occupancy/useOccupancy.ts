import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { rawAutoDataAtom } from "../Utils/useAutoData.ts";
import { settingsAtom } from "../Utils/useSettings.ts";
import OccupancyGrid from "../../types/OccupancyGrid.ts";

export const occupancyAtom = atom((get) => {
        const { occupancyGrid } = get(rawAutoDataAtom);
        const { occupancyInchesPerCell, fieldWidth, fieldHeight } = get(settingsAtom);

        // Get Correct Cell Size
        const cellSize = occupancyInchesPerCell || 6;
        const cellsX = Math.ceil(fieldWidth / cellSize);
        const cellsY = Math.ceil(fieldHeight / cellSize);

        // Check if the occupancy grid is already the correct size
        if (occupancyGrid.length === cellsX && occupancyGrid[0].length === cellsY)
            return occupancyGrid;

        // Generate a new occupancy grid
        const newOccupancyGrid: OccupancyGrid = [];
        for (let x = 0; x < cellsX; x++) {
            newOccupancyGrid[x] = [];
            for (let y = 0; y < cellsY; y++) {
                // Check if the cell is in the old occupancy grid
                if (occupancyGrid[x] && occupancyGrid[x][y] !== undefined)
                    newOccupancyGrid[x][y] = occupancyGrid[x][y];

                // If not, set it to false
                else
                    newOccupancyGrid[x][y] = false;
            }
        }
        return newOccupancyGrid;
    },
    (_, set, update: OccupancyGrid) => {
        const newUpdate = update.map(r => r.map(c => c));
        set(rawAutoDataAtom, (prev) => ({ ...prev, occupancyGrid: newUpdate }));
    }
);

export default function useOccupancy() {
    return useAtom(occupancyAtom);
}

export function useSetOccupancy() {
    return useSetAtom(occupancyAtom);
}

export function useOccupancyValue() {
    return useAtomValue(occupancyAtom);
}