import usePathSpline from "../../hooks/usePathSpline.ts";
import React from "react";
import { Group } from "react-konva";
import { Group as KonvaGroup } from "konva/lib/Group";
import toDegrees from "../../utils/toDegrees.ts";
import RobotRenderer from "./RobotRenderer.tsx";
import useSettingsValue from "../../hooks/useSettings.ts";
import useIsAnimating from "../../hooks/useIsAnimating.ts";

const ANIMATION_INTERVAL = 0.02; // %
const ANIMATION_SPEED = 60; // fps

export default function AnimationRenderer() {
    const [isAnimating] = useIsAnimating();
    const spline = usePathSpline();
    const { pixelsPerInch } = useSettingsValue();
    const renderRef = React.useRef<KonvaGroup>(null);

    React.useEffect(() => {
        if (!isAnimating)
            return;
        let t = 0;
        const interval = setInterval(() => {
            t = (t + ANIMATION_INTERVAL) % spline.length;

            // Update render
            renderRef.current?.rotation(toDegrees(spline.at(t)?.r ?? 0));
            renderRef.current?.x((spline.at(t)?.x ?? 0) * pixelsPerInch);
            renderRef.current?.y((spline.at(t)?.y ?? 0) * pixelsPerInch);
            renderRef.current?.getLayer()?.batchDraw();

        }, 1000 / ANIMATION_SPEED);

        console.log("Animation started");
        return () => clearInterval(interval);
    }, [isAnimating, spline, pixelsPerInch]);

    if (!isAnimating)
        return null;
    return (
        <Group
            x={0}
            y={0}
            rotation={0}
            listening={false}
            ref={renderRef}
            key={"animation-renderer"}
        >
            <RobotRenderer />
        </Group>
    );
}