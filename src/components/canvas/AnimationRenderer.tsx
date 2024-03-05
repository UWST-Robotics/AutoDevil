import usePathSpline from "../../hooks/Path/usePathSpline.ts";
import React from "react";
import RobotRenderer from "./RobotRenderer.tsx";
import useSettingsValue, { DEFAULT_SETTINGS } from "../../hooks/useSettings.ts";
import useIsAnimating from "../../hooks/Canvas/useIsAnimating.ts";
import toDegrees from "../../utils/toDegrees.ts";
import { Group } from "react-konva";
import Konva from "konva";
import { IFrame } from "konva/lib/types";
import useScopeIndices from "../../hooks/Scope/useScopeIndices.ts";

const ANIMATION_INTERVAL = 1000 / 30; // ms
const POINT_INTERVAL = ANIMATION_INTERVAL / 1000; // s

// Animate Spline with React Sprint
export default function AnimationRenderer() {
    const groupRef = React.useRef<Konva.Group>(null);
    const [isAnimating] = useIsAnimating();
    const spline = usePathSpline();
    const scopeIndices = useScopeIndices();
    const settings = useSettingsValue();

    // Get Settings
    const pixelsPerInch = settings.pixelsPerInch ?? DEFAULT_SETTINGS.pixelsPerInch ?? 0;
    const isHolonomic = settings.isHolonomic ?? DEFAULT_SETTINGS.isHolonomic ?? false;

    // Calculate points
    const points = React.useMemo(() => {
        const pointArr = [];
        for (let t = 0; t < spline.length; t += POINT_INTERVAL) {

            // Skip if out of scope
            if (t < scopeIndices.start || t >= scopeIndices.end)
                continue;

            // Add point
            const point = spline.at(t);
            const angle = isHolonomic ?
                toDegrees(point?.state?.gyro ?? 0) :
                toDegrees(spline.angleAt(t) ?? 0);
            pointArr.push({
                x: (point?.x ?? 0) * pixelsPerInch,
                y: (point?.y ?? 0) * pixelsPerInch,
                rotation: angle,
            });
        }
        return pointArr;
    }, [spline, pixelsPerInch, isHolonomic, scopeIndices]);

    // Animate
    React.useEffect(() => {
        if (!isAnimating)
            return () => {
            };
        // Animation loop
        let t = 0;
        const animate = (frame: IFrame | undefined) => {
            if (!groupRef.current || points.length <= 0)
                return;

            // Update position
            const { x, y, rotation } = points[Math.floor(t / ANIMATION_INTERVAL) % points.length];
            groupRef.current.x(x);
            groupRef.current.y(y);
            groupRef.current.rotation(rotation);
            t += frame?.timeDiff ?? 0;
        };

        // Start animation
        const anim = new Konva.Animation(animate, groupRef.current?.getLayer());
        anim.start();
        return () => anim.stop();
    }, [isAnimating, points]);

    if (!isAnimating)
        return null;
    return (
        <Group
            listening={false}
            ref={groupRef}
        >
            <RobotRenderer />
        </Group>
    );
}