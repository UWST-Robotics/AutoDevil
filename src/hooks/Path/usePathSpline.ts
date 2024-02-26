import React from "react";
import cubicLerpPoints from "../../utils/cubicLerp.ts";
import { normalizeRadians } from "../../utils/toDegrees.ts";
import usePathValue from "./usePath.ts";

const DEFAULT_DELTA_T = 0.01; // Time segment to sample

export default function usePathSpline(deltaT?: number) {
    const path = usePathValue();
    const actualDT = deltaT ?? DEFAULT_DELTA_T;

    // Point
    const pointAt = React.useCallback((t: number) => {
        // Index
        const index = Math.floor(t);
        if (index < 0 || index >= path.points.length - 1)
            return undefined;
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

    // Angle
    const angleAt = React.useCallback((t: number) => {
        const p1 = pointAt(t);
        const p2 = pointAt(t + actualDT);
        if (!p1 || !p2)
            return undefined;
        return normalizeRadians(Math.atan2(p2.y - p1.y, p2.x - p1.x) + (p1.state?.isReversed ? Math.PI : 0));
    }, [pointAt]);

    // Velocity
    const velocityAt = React.useCallback((t: number) => {
        const p1 = pointAt(t);
        const p2 = pointAt(t + actualDT);
        if (p1 === undefined || p2 === undefined)
            return undefined;
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)) / actualDT;
    }, [pointAt]);

    // Angular Velocity
    const angularVelocityAt = React.useCallback((t: number) => {
        const a1 = angleAt(t);
        const a2 = angleAt(t + actualDT);
        if (a1 === undefined || a2 === undefined)
            return undefined;
        return normalizeRadians(a2 - a1) / actualDT;
    }, [angleAt]);

    return {
        path,
        length: path.points.length - 1,
        at: pointAt,
        angleAt,
        velocityAt,
        angularVelocityAt,
    }
}