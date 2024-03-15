import { Box } from "@mui/material";
import toDegrees, { normalizeRadians, toRadians } from "../../utils/toDegrees.ts";
import React from "react";
import { useSelectedPointValue } from "../../hooks/Point/useSelectPoint.ts";
import { usePathPoint } from "../../hooks/Point/usePathPoint.ts";
import { DEFAULT_GUID } from "../../utils/generateGUID.ts";
import PointTransformInput from "./PointTransformInput.tsx";

export default function PointTransformInputs() {
    const selectedPointID = useSelectedPointValue()
    const [point, setPoint] = usePathPoint(selectedPointID ?? DEFAULT_GUID);

    const onXChange = React.useCallback((value: number) => {
        if (!point)
            return;
        setPoint({ ...point, x: value });
    }, [point, setPoint]);

    const onYChange = React.useCallback((value: number) => {
        if (!point)
            return;
        setPoint({ ...point, y: value });
    }, [point, setPoint]);

    const onAngleChange = React.useCallback((value: number) => {
        if (!point)
            return;
        setPoint({ ...point, r: normalizeRadians(toRadians(value)) });
    }, [point, setPoint]);

    return (
        <Box
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
                gap: 4
            }}
        >
            <PointTransformInput
                label={"X"}
                value={point?.x ?? 0}
                onChange={onXChange}
            />
            <PointTransformInput
                label={"Y"}
                value={point?.y ?? 0}
                onChange={onYChange}
            />
            <PointTransformInput
                label={"Angle"}
                value={toDegrees(point?.r ?? 0)}
                onChange={onAngleChange}
            />
        </Box>
    )
}