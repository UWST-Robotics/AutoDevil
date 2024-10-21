import AutoStep from "./AutoStep.ts";
import React from "react";
import AutoStepType from "./AutoStepType.ts";

export default interface AutoStepInfo {
    isHidden?: boolean;
    name: string;
    type: AutoStepType;
    icon: React.ReactNode;
    create: () => AutoStep;
}