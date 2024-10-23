import {KonvaEventObject} from "konva/lib/Node";
import useSaveUndoHistory from "../Utils/useUndoHistory.ts";
import useSettingsValue from "../Utils/useSettings.ts";
import React from "react";
import GUID from "../../types/GUID.ts";
import useAutoStep from "../AutoSteps/useAutoStep.ts";
import useAutoStepPose from "../Pose/useAutoStepPose.ts";

const SNAP_DISTANCE = 2; // in

export default function useAutoStepDragListener(id: GUID) {
    const savePathHistory = useSaveUndoHistory();
    const {pixelsPerInch, isSpline, snapPosition} = useSettingsValue();
    const [autoStep, setAutoStep] = useAutoStep(id);
    const autoStepPose = useAutoStepPose(id);

    // Event Handlers
    const onDragStart = React.useCallback((e: KonvaEventObject<DragEvent>) => {
        e.cancelBubble = true;
    }, []);
    const onDrag = React.useCallback((e: KonvaEventObject<DragEvent>) => {
        // Calculate new position
        let x = e.target.x() / pixelsPerInch;
        let y = e.target.y() / pixelsPerInch;

        // Snap to grid
        if (snapPosition) {
            x = Math.round(x / SNAP_DISTANCE) * SNAP_DISTANCE;
            y = Math.round(y / SNAP_DISTANCE) * SNAP_DISTANCE;

            e.target.x(x * pixelsPerInch);
            e.target.y(y * pixelsPerInch);
        }

        // Set Pose
        if (!autoStep)
            return;
        setAutoStep({
            ...autoStep,
            pose: {
                ...autoStepPose ?? {x: 0, y: 0, r: 0},
                x,
                y
            }
        });

        // Calculate angle between this and next point
        // const currentPoint = {...point, x, y};
        // if (!isSpline && !isEnd && nextPoint)
        //     currentPoint.r = calcAngle(currentPoint, nextPoint);

        // Update Point
        // setAutoStep({
        //     ...autoStep
        // });

        // Update Previous Point
        // if (prevPoint && !isSpline) {
        //     const prevAngle = calcAngle(prevPoint, currentPoint);
        //     setPrevPoint({
        //         ...prevPoint,
        //         r: prevAngle
        //     });
        // }
    }, [pixelsPerInch, isSpline, snapPosition]);
    const onDragEnd = React.useCallback((e: KonvaEventObject<DragEvent>) => {
        onDrag(e);
        savePathHistory();
    }, [onDrag, savePathHistory]);

    return [
        onDragStart,
        onDrag,
        onDragEnd
    ] as const;
}