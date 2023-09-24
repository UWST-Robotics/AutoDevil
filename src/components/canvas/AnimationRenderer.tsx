import usePathSpline from "../../hooks/Path/usePathSpline.ts";
import React from "react";
import RobotRenderer from "./RobotRenderer.tsx";
import useSettingsValue from "../../hooks/useSettings.ts";
import useIsAnimating from "../../hooks/Canvas/useIsAnimating.ts";
import toDegrees from "../../utils/toDegrees.ts";
import { Group } from "react-konva";
import Konva from "konva";
import { IFrame } from "konva/lib/types";

const ANIMATION_INTERVAL = 1000 / 30; // ms
const POINT_INTERVAL = ANIMATION_INTERVAL / 1000; // s

// Animate Spline with React Sprint
export default function AnimationRenderer() {
    const groupRef = React.useRef<Konva.Group>(null);
    const [isAnimating] = useIsAnimating();
    const spline = usePathSpline();
    const { pixelsPerInch, isHolonomic } = useSettingsValue();

    // Calculate points
    const points = React.useMemo(() => {
        return Array.from({ length: spline.length / POINT_INTERVAL }).map((_, i) => {
            const point = spline.at(i * POINT_INTERVAL);
            const angle = isHolonomic ?
                toDegrees(point?.state?.gyro ?? 0) :
                toDegrees(spline.angleAt(i * POINT_INTERVAL) ?? 0);
            return {
                x: (point?.x ?? 0) * pixelsPerInch,
                y: (point?.y ?? 0) * pixelsPerInch,
                rotation: angle,
            };
        });
    }, [spline, pixelsPerInch, isHolonomic]);

    // Animate
    React.useEffect(() => {
        if (!isAnimating)
            return () => {
            };
        // Animation loop
        let t = 0;
        const animate = (frame: IFrame | undefined) => {
            if (!groupRef.current)
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