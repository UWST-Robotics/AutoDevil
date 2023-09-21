import usePathSpline from "../../hooks/usePathSpline.ts";
import React from "react";
import RobotRenderer from "./RobotRenderer.tsx";
import useSettingsValue from "../../hooks/useSettings.ts";
import useIsAnimating from "../../hooks/useIsAnimating.ts";
import { animated, useSpring } from "@react-spring/konva";
import styled from "styled-components";
import toDegrees from "../../utils/toDegrees.ts";

// @ts-ignore
const StyledGroup = styled(animated.Group)``;

// Animate Spline with React Sprint
export default function AnimationRenderer() {
    const [isAnimating] = useIsAnimating();
    const spline = usePathSpline();
    const { pixelsPerInch } = useSettingsValue();

    // Calculate points
    const points = React.useMemo(() => {
        return Array.from({ length: spline.length / 0.05 }).map((_, i) => {
            const point = spline.at(i * 0.05);
            return {
                x: (point?.x ?? 0) * pixelsPerInch,
                y: (point?.y ?? 0) * pixelsPerInch,
                rotation: toDegrees(point?.r ?? 0),
            }
        });
    }, [spline, pixelsPerInch]);

    // Calculate spring
    const spring = useSpring({
        config: {
            duration: 50,
        },
        from: points[0],
        to: points,
        reset: true,
        loop: true,
        reverse: true,
    });

    if (!isAnimating)
        return null;
    return (
        <StyledGroup
            x={spring.x}
            y={spring.y}
            rotation={spring.rotation}
            listening={false}
        >
            <RobotRenderer />
        </StyledGroup>
    );
}