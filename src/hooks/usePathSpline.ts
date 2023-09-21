import usePathPlanValue from "./usePathPlan.ts";
import React from "react";
import cubicLerpPoints from "../utils/cubicLerp.ts";
import { normalizeRadians } from "../utils/toDegrees.ts";

export default function usePathSpline() {
    const path = usePathPlanValue();

    const pointAt = React.useCallback((t: number) => {
        // Index
        const index = Math.floor(t);
        if (index < 0 || index >= path.points.length - 1)
            return null;
        // Points
        const p1 = { ...path.points[index] };
        const p2 = { ...path.points[index + 1] };
        // Anchor points
        const a1 = {
            ...p1,
            x: p1.x + p1.exitDelta * Math.cos(p1.r) * (p1.isReversed ? -1 : 1),
            y: p1.y + p1.exitDelta * Math.sin(p1.r) * (p1.isReversed ? -1 : 1)
        };
        const a2 = {
            ...p2,
            x: p2.x - p2.enterDelta * Math.cos(p2.r),
            y: p2.y - p2.enterDelta * Math.sin(p2.r)
        };
        // Lerp
        return cubicLerpPoints(p1, a1, a2, p2, t - index);
    }, [path]);

    const angleAt = React.useCallback((t: number) => {
        const p1 = pointAt(t);
        const p2 = pointAt(t + 0.01);
        if (!p1 || !p2)
            return 0;
        return normalizeRadians(Math.atan2(p2.y - p1.y, p2.x - p1.x));
    }, [pointAt]);

    return {
        length: path.points.length - 1,
        at: pointAt,
        angleAt,
    }
}