import OccupancyGrid from "./OccupancyGrid.ts";
import AutoStep from "./AutoSteps/AutoStep.ts";

interface AutoData {
    name: string;
    steps: AutoStep[];
    occupancyGrid: OccupancyGrid;
}

export default AutoData;