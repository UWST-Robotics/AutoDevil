import React from "react";
import cubicLerpPoints, { lerpPoints } from "../../utils/cubicLerp.ts";
import usePathValue from "./usePath.ts";
import useSettingsValue from "../Utils/useSettings.ts";

const DEFAULT_DELTA_T = 0.001; // Time segment to sample

export default function usePathSpline(deltaT?: number) {
    const { isSpline, normalizeRotation } = useSettingsValue();
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
        // Linear Lerp
        if (!isSpline)
            return lerpPoints(p1, p2, t - index, normalizeRotation);
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
        // Cubic Lerp
        return cubicLerpPoints(p1, a1, a2, p2, t - index, normalizeRotation);
    }, [path, isSpline, normalizeRotation]);

    // Angle
    const angleAt = React.useCallback((t: number) => {
        let p1 = pointAt(t);
        let p2 = pointAt(t + actualDT);

        // Attempt to get previous point
        if (!p1 || !p2) {
            p1 = pointAt(t - actualDT);
            p2 = pointAt(t);
        }

        if (!p1 || !p2)
            return undefined;
        return Math.atan2(p2.y - p1.y, p2.x - p1.x) + (p2.state?.isReversed ? Math.PI : 0);
    }, [pointAt, actualDT]);

    // Velocity
    const velocityAt = React.useCallback((t: number) => {
        const p1 = pointAt(t);
        const p2 = pointAt(t + actualDT);
        if (p1 === undefined || p2 === undefined)
            return undefined;
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)) / actualDT;
    }, [pointAt, actualDT]);

    // Angular Velocity
    const angularVelocityAt = React.useCallback((t: number) => {
        const a1 = angleAt(t);
        const a2 = angleAt(t + actualDT);
        if (a1 === undefined || a2 === undefined)
            return undefined;
        return (a2 - a1) / actualDT;
    }, [angleAt, actualDT]);

    return {
        path,
        length: path.points.length - 1,
        at: pointAt,
        angleAt,
        velocityAt,
        angularVelocityAt,
    }
}