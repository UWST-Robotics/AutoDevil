import usePathPlanValue from "../Path/usePathPlan.ts";
import React from "react";
import AnimState from "../../types/AnimState.ts";
import GUID from "../../types/GUID.ts";

export default function useGetAnimState() {
    const pathPlan = usePathPlanValue();

    const getAnimState = React.useCallback((index: number | GUID) => {
        const pointIndex = typeof index === "number" ?
            Math.floor(index) :
            pathPlan.points.findIndex((p) => p.id === index) - 1;
        const state: AnimState = {
            isReversed: false,
        };
        if (pointIndex < 0 || pointIndex >= pathPlan.points.length - 1)
            return state;

        for (let i = 0; i <= pointIndex; i++) {
            const point = pathPlan.points[i];
            if (point.isReversed)
                state.isReversed = !state.isReversed;
        }
        return state;
    }, [pathPlan]);

    return getAnimState;
}

export function useAnimState(index: number | GUID) {
    const getAnimState = useGetAnimState();
    return getAnimState(index);
}