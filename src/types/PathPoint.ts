import GUID from "./GUID.ts";
import PathEvent from "./PathEvent.ts";

interface PathPoint {
    id: GUID;
    x: number;
    y: number;
    r: number;
    enterDelta: number;
    exitDelta: number;
    isReversed?: boolean;
    events?: PathEvent[];
    state?: {
        isReversed: boolean;
        gyro: number;
    }
}

export default PathPoint;