import useSettingsValue from "../../../hooks/Utils/useSettings.ts";
import useSaveUndoHistory from "../../../hooks/Utils/useUndoHistory.ts";
import {Circle, Group, Line} from "react-konva";
import GUID from "../../../types/GUID.ts";
import useAutoStep from "../../../hooks/AutoSteps/useAutoStep.ts";
import {KonvaEventObject} from "konva/lib/Node";
import {DEFAULT_POSE} from "../../../types/Pose.ts";
import React from "react";
import {toDegrees} from "../../../utils/UnitConversions.ts";

const HANDLE_RADIUS = 1; // in
const HANDLE_LINE_WIDTH = 0.5; // in
const SNAP_ANGLE = 22.5; // degs

export interface AnchorRendererProps {
    id: GUID;
    color?: string;
}

export default function AnchorRenderer(props: AnchorRendererProps) {
    const {pixelsPerInch, snapRotation} = useSettingsValue();
    const saveUndoHistory = useSaveUndoHistory();
    const [autoStep, setAutoStep] = useAutoStep(props.id);

    const onDragMove = React.useCallback((e: KonvaEventObject<DragEvent>) => {

        if (!autoStep)
            return;

        // Calculate delta angle and distance
        const deltaAngle = Math.atan2(e.target.y(), e.target.x());
        console.log(e.target.x(), e.target.y(), deltaAngle);

        // Apply to rotation
        let rotation = autoStep?.pose?.r ?? DEFAULT_POSE.r;
        rotation += toDegrees(deltaAngle);

        // Snap rotation if enabled
        if (snapRotation) {
            const snap = Math.round(rotation / SNAP_ANGLE) * SNAP_ANGLE;
            if (Math.abs(snap - rotation) < SNAP_ANGLE / 2)
                rotation = snap;
        }

        // Update AutoStep
        setAutoStep({
            ...autoStep,
            pose: {
                ...(autoStep.pose ?? DEFAULT_POSE),
                r: rotation
            }
        });

        // Reset position to handle center
        e.target.position({
            x: 10 * pixelsPerInch,
            y: 0
        });
        e.cancelBubble = true;
    }, [autoStep, setAutoStep, pixelsPerInch, snapRotation]);

    const onDragEnd = React.useCallback((e: KonvaEventObject<DragEvent>) => {
        onDragMove(e);
        saveUndoHistory();
    }, [onDragMove, saveUndoHistory]);

    return (
        <Group>
            <Circle
                x={10 * pixelsPerInch}
                y={0}
                radius={HANDLE_RADIUS * pixelsPerInch}
                stroke={props.color ?? "#fff"}
                strokeWidth={HANDLE_LINE_WIDTH * pixelsPerInch}
                fill={"transparent"}
                draggable
                onDragMove={onDragMove}
                onDragEnd={onDragEnd}
                perfectDrawEnabled={false}
            />
            <Line
                points={[
                    0,
                    0,
                    10 * pixelsPerInch,
                    0
                ]}
                stroke={props.color ?? "#fff"}
                strokeWidth={HANDLE_LINE_WIDTH * pixelsPerInch}
                listening={false}
                perfectDrawEnabled={false}
            />
        </Group>
    )
}