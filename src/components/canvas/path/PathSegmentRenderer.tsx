import usePrevAutoStep from "../../../hooks/AutoSteps/usePrevAutoStep.ts";
import useAutoStep from "../../../hooks/AutoSteps/useAutoStep.ts";
import GUID, {EMPTY_GUID} from "../../../types/GUID.ts";
import useAutoStepPose from "../../../hooks/Pose/useAutoStepPose.ts";
import JumpToStepType from "../../../types/AutoSteps/AutoStepTypes/JumpToStep.ts";
import getAutoStepType from "../../../utils/getAutoStepType.ts";
import PathRenderer from "./SplineRenderer.tsx";
import {Group} from "react-konva";
import usePathSplineSegment from "../../../hooks/Path/usePathSplineSegment.ts";
import getOffsetPath from "../../../utils/getOffsetPath.ts";
import useSettingsValue from "../../../hooks/Utils/useSettings.ts";

export interface PathSegmentRendererProps {
    autoStepID: GUID;
}

export default function PathSegmentRenderer(props: PathSegmentRendererProps) {
    const {showEdgeTrail, robotHeight} = useSettingsValue();
    const [prevAutoStep] = usePrevAutoStep(props.autoStepID);
    const [autoStep] = useAutoStep(props.autoStepID);
    const pose = useAutoStepPose(autoStep?.id ?? EMPTY_GUID);
    const prevPose = useAutoStepPose(prevAutoStep?.id ?? EMPTY_GUID);
    const autoStepType = getAutoStepType(autoStep);
    const path = usePathSplineSegment(prevPose, pose, autoStepType?.pathType ?? "linear");

    const leftPath = path ? getOffsetPath(path, {x: 0, y: robotHeight * 0.5}) : null;
    const rightPath = path ? getOffsetPath(path, {x: 0, y: -robotHeight * 0.5}) : null;

    const isJumpToStep = autoStep?.typeID === JumpToStepType.id;

    if (!prevAutoStep)
        return;     // <-- Don't show first path segment
    if (!autoStep || !pose || !prevPose ||
        !path || !leftPath || !rightPath)
        return null;

    return (
        <Group>
            <PathRenderer
                path={path}

                stroke={"#ddd"}
                opacity={0.6}
                strokeWidth={0.4}
                perfectDrawEnabled={false}

                dashEnabled={isJumpToStep}
                dash={[1, 1]}
            />
            
            {showEdgeTrail && (
                <PathRenderer
                    path={leftPath}
                    stroke={"#ddd"}
                    opacity={0.4}
                    strokeWidth={0.2}
                    perfectDrawEnabled={false}
                />
            )}
            {showEdgeTrail && (
                <PathRenderer
                    path={rightPath}
                    stroke={"#ddd"}
                    opacity={0.4}
                    strokeWidth={0.2}
                    perfectDrawEnabled={false}
                />
            )}
        </Group>
    )
}