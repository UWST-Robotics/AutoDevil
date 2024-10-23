import AutoStep from "./AutoStep.ts";
import React from "react";
import AutoStepType from "./AutoStepType.ts";
import Pose from "../Pose.ts";

export default interface AutoStepInfo {
    isHidden?: boolean;
    name: string;
    type: AutoStepType;
    icon: React.ReactNode;
    deserialize: (params: number[]) => AutoStep;
    serialize: (step: AutoStep) => number[];
    getPose: (step: AutoStep, prevPose: Pose) => Pose;
}