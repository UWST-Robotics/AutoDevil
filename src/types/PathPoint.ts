import GUID from "./GUID.ts";

interface PathPoint {
    id: GUID;
    x: number;
    y: number;
    r: number;
    enterDelta: number;
    exitDelta: number;
    isReversed?: boolean;
    events?: string[];
}

export default PathPoint;