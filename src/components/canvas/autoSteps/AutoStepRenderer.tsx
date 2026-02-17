import GUID from "../../../types/GUID.ts";
import {Group} from "react-konva";
import RobotRenderer from "./RobotRenderer.tsx";
import useSelectedAutoStepID from "../../../hooks/AutoSteps/selected/useSelectedAutoStepID.ts";
import React from "react";
import useCursorListener from "../../../hooks/Canvas/useCursorListener.ts";
import useAutoStepPose from "../../../hooks/Pose/useAutoStepPose.ts";
import useAutoStepDragListener from "../../../hooks/Canvas/useAutoStepDragListener.ts";
import useSettingsValue from "../../../hooks/Utils/useSettings.ts";
import DriveToStepType from "../../../types/AutoSteps/AutoStepTypes/DriveToStepType.ts";
import JumpToStepType from "../../../types/AutoSteps/AutoStepTypes/JumpToStep.ts";
import useAutoStep from "../../../hooks/AutoSteps/useAutoStep.ts";

export interface AutoStepRendererProps {
    id: GUID;
}

export default function AutoStepRenderer(props: AutoStepRendererProps) {
    const [autoStep] = useAutoStep(props.id);
    const pose = useAutoStepPose(props.id);
    const [selectedAutoStepID, setSelectedAutoStepID] = useSelectedAutoStepID();
    const [onMouseOver, onMouseOut, isHovered] = useCursorListener("pointer");
    const [onDragStart, onDragMove, onDragEnd] = useAutoStepDragListener(props.id);
    const {pixelsPerInch} = useSettingsValue();

    // State
    const isSelected = selectedAutoStepID === props.id;

    const color = React.useMemo(() => {
        if (isSelected)
            return "#4181d0";
        return "#fff";
    }, [isSelected]);

    // Actions
    const selectAutoStep = () => setSelectedAutoStepID(props.id);

    const draggable = autoStep?.typeID === DriveToStepType.id || autoStep?.typeID === JumpToStepType.id;

    if (!pose || !autoStep)
        return null;
    return (
        <Group
            x={pose.x * pixelsPerInch}
            y={pose.y * pixelsPerInch}
            rotation={pose.r}
            opacity={isSelected ? 1 : isHovered ? 0.3 : 0.15}
            onMouseEnter={onMouseOver}
            onMouseLeave={onMouseOut}
            onMouseDown={selectAutoStep}
            onDragStart={onDragStart}
            onDragMove={onDragMove}
            onDragEnd={onDragEnd}
            onClick={e => e.cancelBubble = true}
            listening={draggable}
            draggable={draggable}
        >
            <RobotRenderer
                color={color}
            />
        </Group>
    )
}