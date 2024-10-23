import usePathSpline from "../../hooks/Path/usePathSpline.ts";
import React from "react";
import RobotRenderer from "../autoSteps/canvas/RobotRenderer.tsx";
import useSettingsValue from "../../hooks/Utils/useSettings.ts";
import useIsAnimating from "../../hooks/Canvas/useIsAnimating.ts";
import toDegrees from "../../utils/toDegrees.ts";
import {Group} from "react-konva";
import Konva from "konva";
import {IFrame} from "konva/lib/types";
import useScopeIndices from "../../hooks/Scope/useScopeIndices.ts";

const ANIMATION_STEP = 0.001; // %
const MIN_DELTA_PX = 15; // px
const MAX_ITERATIONS = 10; // iterations

// Animate Spline with React Sprint
export default function AnimationRenderer() {
    const groupRef = React.useRef<Konva.Group>(null);
    const [isAnimating] = useIsAnimating();
    const spline = usePathSpline();
    const scopeIndices = useScopeIndices();
    const {showOccupancyGrid, pixelsPerInch, isHolonomic} = useSettingsValue();
    const minDelta = React.useMemo(() => Math.pow(MIN_DELTA_PX / pixelsPerInch, 2), [pixelsPerInch]);
    const t = React.useRef(0);

    // Get Point
    const getPoint = React.useCallback((t: number) => {
        const point = spline.at(t);
        const angle = isHolonomic ?
            toDegrees(point?.state?.gyro ?? 0) :
            toDegrees(spline.angleAt(t) ?? 0);
        return {
            x: (point?.x ?? 0) * pixelsPerInch,
            y: (point?.y ?? 0) * pixelsPerInch,
            rotation: angle,
        };
    }, [spline, pixelsPerInch, isHolonomic]);

    // Animate
    React.useEffect(() => {
        if (!isAnimating)
            return () => {
            };

        // Animation loop
        const animate = (_: IFrame | undefined) => {
            if (!groupRef.current)
                return;

            // Get delta
            let deltaDistance = 0;
            let point = getPoint(t.current);
            let iterations = 0;
            do {
                // Check Iterations
                if (iterations++ > MAX_ITERATIONS)
                    break;

                // Increment t
                t.current = (t.current + ANIMATION_STEP) % spline.length;
                if (t.current < scopeIndices.start || t.current > scopeIndices.end)
                    t.current = scopeIndices.start;

                // Get Point
                point = getPoint(t.current);

                // Calculate Delta Distance
                deltaDistance = Math.pow(point.x - groupRef.current.x(), 2) + Math.pow(point.y - groupRef.current.y(), 2);
            }
            while (deltaDistance < minDelta);

            // Update Position
            const {x, y, rotation} = point;
            groupRef.current.x(x);
            groupRef.current.y(y);
            groupRef.current.rotation(rotation);
        };

        // Start animation
        const anim = new Konva.Animation(animate, groupRef.current?.getLayer());
        anim.start();
        return () => anim.stop()
    }, [isAnimating, minDelta, getPoint, spline, scopeIndices, pixelsPerInch]);

    if (showOccupancyGrid)
        return null;
    return (
        <Group
            listening={false}
            ref={groupRef}
            opacity={isAnimating ? 1 : 0}
        >
            <RobotRenderer/>
        </Group>
    );
}