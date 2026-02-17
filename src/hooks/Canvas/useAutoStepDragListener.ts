import {KonvaEventObject} from "konva/lib/Node";
import useSaveUndoHistory from "../Utils/useUndoHistory.ts";
import useSettingsValue from "../Utils/useSettings.ts";
import React from "react";
import GUID, {EMPTY_GUID} from "../../types/GUID.ts";
import useAutoStep from "../AutoSteps/useAutoStep.ts";
import usePrevAutoStep from "../AutoSteps/usePrevAutoStep.ts";
import useAutoStepPose from "../Pose/useAutoStepPose.ts";

const SNAP_DISTANCE = 1; // in

export default function useAutoStepDragListener(id: GUID) {
    const savePathHistory = useSaveUndoHistory();
    const {isSpline, snapPosition} = useSettingsValue();
    const [autoStep, setAutoStep] = useAutoStep(id);
    const [prevAutoStep] = usePrevAutoStep(id);
    const prevPose = useAutoStepPose(prevAutoStep?.id ?? EMPTY_GUID);

    // Event Handlers
    const onDragStart = React.useCallback((e: KonvaEventObject<DragEvent>) => {
        e.cancelBubble = true;
    }, []);
    const onDrag = React.useCallback((e: KonvaEventObject<DragEvent>) => {
        // Calculate new position
        let x = e.target.x();
        let y = e.target.y();

        // Snap to grid
        if (snapPosition) {
            x = Math.round(x / SNAP_DISTANCE) * SNAP_DISTANCE;
            y = Math.round(y / SNAP_DISTANCE) * SNAP_DISTANCE;

            e.target.x(x);
            e.target.y(y);
        }

        // Set Pose
        if (!autoStep)
            return;

        const pose = {x, y, r: autoStep.pose?.r ?? 0};
        setAutoStep({...autoStep, pose});
    }, [isSpline, snapPosition, autoStep, setAutoStep]);
    const onDragEnd = React.useCallback((_e: KonvaEventObject<DragEvent>) => {

        // // Drive AutoStep
        // if (autoStep?.typeID === DriveToStepType.id) {
        //     // Calculate Point on Line
        //     const pointA = prevPose ?? {x: 0, y: 0, r: 0};
        //     const pointB = {
        //         x: pointA.x + Math.cos(pointA.r * DEG_TO_RAD) * 100,
        //         y: pointA.y + Math.sin(pointA.r * DEG_TO_RAD) * 100,
        //         r: pointA.r
        //     };
        //     const pointC = autoStep as AutoStep & Pose;
        //     const finalPoint = getNearestPointOnLine(pointC.x, pointC.y, pointA.x, pointA.y, pointB.x, pointB.y, false);
        //
        //     // Calculate Distance
        //     let distance = Math.sqrt((finalPoint.x - pointA.x) ** 2 + (finalPoint.y - pointA.y) ** 2);
        //
        //     // Handle Negative Distance
        //     if (finalPoint.t < 0)
        //         distance *= -1;
        //
        //     // Update AutoStep
        //     setAutoStep({
        //         ...autoStep,
        //         distance
        //     });
        //
        //     // Update Group
        //     e.target.x(finalPoint.x * pixelsPerInch);
        //     e.target.y(finalPoint.y * pixelsPerInch);
        // }

        savePathHistory();
    }, [onDrag, savePathHistory, prevPose, autoStep, setAutoStep]);

    return [
        onDragStart,
        onDrag,
        onDragEnd
    ] as const;
}