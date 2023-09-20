import usePathPlanValue from "./usePathPlan.ts";
import React from "react";
import cubicLerpPoints from "../utils/cubicLerp.ts";

export default function usePathSpline() {
    const path = usePathPlanValue();

    const getSpline = React.useCallback((t: number) => {
        const index = Math.floor(t);
        if (index < 0 || index >= path.points.length - 1)
            return null;
        const p1 = path.points[index];
        const p2 = path.points[index + 1];
        const a1 = {
            ...p1,
            x: p1.x + p1.exitDelta * Math.cos(p1.r),
            y: p1.y + p1.exitDelta * Math.sin(p1.r),
        };
        const a2 = {
            ...p2,
            x: p2.x - p2.enterDelta * Math.cos(p2.r),
            y: p2.y - p2.enterDelta * Math.sin(p2.r),
        };
        return cubicLerpPoints(p1, a1, a2, p2, t - index);
    }, [path]);

    return {
        length: path.points.length - 1,
        at: getSpline,
    }
}