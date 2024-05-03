import OccupancyGrid from "./OccupancyGrid.ts";
import PathData from "./PathData.ts";

interface AutoData {
    points: PathData;
    occupancyGrid: OccupancyGrid;
}

export default AutoData;