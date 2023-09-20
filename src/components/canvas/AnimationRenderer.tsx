import usePathSpline from "../../hooks/usePathSpline.ts";
import React from "react";
import { Group } from "react-konva";
import toDegrees from "../../utils/toDegrees.ts";
import RobotRenderer from "./RobotRenderer.tsx";
import useSettingsValue from "../../hooks/useSettings.ts";
import useIsAnimating from "../../hooks/useIsAnimating.ts";

const ANIMATION_INTERVAL = 0.02; // %
const ANIMATION_SPEED = 60; // fps

export default function AnimationRenderer() {
    const [isAnimating] = useIsAnimating();
    const [t, setT] = React.useState(0);
    const spline = usePathSpline();
    const { pixelsPerInch } = useSettingsValue();

    React.useEffect(() => {
        if (!isAnimating)
            return;
        const interval = setInterval(() => {
            setT((t) => (t + ANIMATION_INTERVAL) % spline.length);
        }, 1000 / ANIMATION_SPEED);
        return () => clearInterval(interval);
    }, [isAnimating, spline.length]);

    const point = spline.at(t);
    if (!point || !isAnimating)
        return null;
    return (
        <Group
            x={point.x * pixelsPerInch}
            y={point.y * pixelsPerInch}
            rotation={toDegrees(point.r)}
        >
            <RobotRenderer />
        </Group>
    );
}