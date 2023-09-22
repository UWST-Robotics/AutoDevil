import usePathSpline from "../../hooks/usePathSpline.ts";
import React from "react";
import RobotRenderer from "./RobotRenderer.tsx";
import useSettingsValue from "../../hooks/useSettings.ts";
import useIsAnimating from "../../hooks/useIsAnimating.ts";
import toDegrees from "../../utils/toDegrees.ts";
import useGetAnimState from "../../hooks/useGetAnimState.ts";
import { Group } from "react-konva";
import Konva from "konva";

const ANIMATION_INTERVAL = 1000 / 60; // ms
const POINT_INTERVAL = ANIMATION_INTERVAL / 1000; // s

// Animate Spline with React Sprint
export default function AnimationRenderer() {
    const groupRef = React.useRef<Konva.Group>(null);
    const [isAnimating] = useIsAnimating();
    const spline = usePathSpline();
    const { pixelsPerInch, isHolonomic } = useSettingsValue();
    const getAnimState = useGetAnimState();

    // Calculate points
    const points = React.useMemo(() => {
        return Array.from({ length: spline.length / POINT_INTERVAL }).map((_, i) => {
            const point = spline.at(i * POINT_INTERVAL);
            const angle = isHolonomic ?
                toDegrees(point?.r ?? 0) :
                toDegrees(spline.angleAt(i * POINT_INTERVAL));
            return {
                x: (point?.x ?? 0) * pixelsPerInch,
                y: (point?.y ?? 0) * pixelsPerInch,
                rotation: angle + (getAnimState(i * POINT_INTERVAL).isReversed ? 180 : 0),
            };
        });
    }, [spline, pixelsPerInch, isHolonomic, getAnimState]);

    // Animate
    React.useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (!groupRef.current)
                return;
            const { x, y, rotation } = points[index];
            groupRef.current.x(x);
            groupRef.current.y(y);
            groupRef.current.rotation(rotation);
            index = (index + 1) % points.length;
        }, ANIMATION_INTERVAL);
        return () => clearInterval(interval);
    }, [points]);

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