import { Box } from "@mui/material";
import toDegrees, { normalizeRadians, toRadians } from "../../utils/toDegrees.ts";
import React from "react";
import { useSelectedPointValue } from "../../hooks/Point/useSelectPoint.ts";
import { usePathPoint } from "../../hooks/Point/usePathPoint.ts";
import { DEFAULT_GUID } from "../../utils/generateGUID.ts";
import PointTransformInput from "./PointTransformInput.tsx";
import useSettingsValue from "../../hooks/Utils/useSettings.ts";
import roundTo from "../../utils/roundTo.ts";

const DECIMAL_PLACES = 4;

export default function PointTransformInputs() {
    const selectedPointID = useSelectedPointValue()
    const [point, setPoint] = usePathPoint(selectedPointID ?? DEFAULT_GUID);
    const { normalizeRotation } = useSettingsValue();

    // Update point values
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

        // Process Angle
        let radians = toRadians(value);
        if (normalizeRotation)
            radians = normalizeRadians(radians);

        // Update Point
        setPoint({ ...point, r: radians });
    }, [normalizeRotation, point, setPoint]);

    // Round to decimal places
    const round = React.useCallback((value: number) => {
        return roundTo(value, DECIMAL_PLACES);
    }, []);

    return (
        <Box
            style={{
                marginTop: 10,
            }}
        >
            <Box
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                    gap: 4
                }}
            >
                <PointTransformInput
                    label={"X"}
                    value={round(point?.x ?? 0)}
                    onChange={onXChange}
                    isEqual={(a, b) => {
                        return round(a) === round(b);
                    }}
                />
                <PointTransformInput
                    label={"Y"}
                    value={round(point?.y ?? 0)}
                    onChange={onYChange}
                    isEqual={(a, b) => {
                        return round(a) === round(b);
                    }}
                />
            </Box>
            <PointTransformInput
                label={"Angle"}
                value={roundTo(toDegrees(point?.r ?? 0), DECIMAL_PLACES)}
                onChange={onAngleChange}
                isEqual={(a, b) => {
                    return round(normalizeRadians(toRadians(a))) === round(normalizeRadians(toRadians(b)));
                }}
            />
        </Box>
    )
}