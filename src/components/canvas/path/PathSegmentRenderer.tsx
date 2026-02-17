import usePrevAutoStep from "../../../hooks/AutoSteps/usePrevAutoStep.ts";
import useAutoStep from "../../../hooks/AutoSteps/useAutoStep.ts";
import GUID, {EMPTY_GUID} from "../../../types/GUID.ts";
import useAutoStepPose from "../../../hooks/Pose/useAutoStepPose.ts";
import {Line} from "react-konva";
import useSettingsValue from "../../../hooks/Utils/useSettings.ts";
import JumpToStepType from "../../../types/AutoSteps/AutoStepTypes/JumpToStep.ts";
import usePathSplineSegment from "../../../hooks/Path/usePathSplineSegment.ts";
import React from "react";

export interface PathSegmentRendererProps {
    autoStepID: GUID;
}

export default function PathSegmentRenderer(props: PathSegmentRendererProps) {
    const [prevAutoStep] = usePrevAutoStep(props.autoStepID);
    const [autoStep] = useAutoStep(props.autoStepID);
    const pose = useAutoStepPose(autoStep?.id ?? EMPTY_GUID);
    const prevPose = useAutoStepPose(prevAutoStep?.id ?? EMPTY_GUID);
    const {pixelsPerInch} = useSettingsValue();
    const pathSegment = usePathSplineSegment(prevAutoStep?.id ?? EMPTY_GUID, autoStep?.id ?? EMPTY_GUID);

    const pathPoints = React.useMemo(() => {
        if (!pathSegment)
            return [];
        const points: number[] = [];
        for (const point of pathSegment)
            points.push(point.x * pixelsPerInch, point.y * pixelsPerInch);

        return points;
    }, [pathSegment, pixelsPerInch]);

    const isJumpToStep = autoStep?.typeID === JumpToStepType.id;

    if (!prevAutoStep)
        return;     // <-- Don't show first path segment
    if (!autoStep || !pose || !prevPose)
        return null;

    return (
        <Line
            points={pathPoints}
            stroke={"#ddd"}
            opacity={0.6}
            strokeWidth={0.4 * pixelsPerInch}
            perfectDrawEnabled={false}

            dashEnabled={isJumpToStep}
            dash={[5, 5]}

        />
    )
}