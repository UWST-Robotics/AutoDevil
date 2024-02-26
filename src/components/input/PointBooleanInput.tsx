import { Switch } from "@blueprintjs/core";
import React from "react";
import PathPoint from "../../types/PathPoint.ts";
import { useSelectedPointValue } from "../../hooks/Point/useSelectPoint.ts";
import { usePathPoint } from "../../hooks/Point/usePathPoint.ts";
import { DEFAULT_GUID } from "../../utils/generateGUID.ts";

export interface PointBooleanInputProps {
    label: string;
    setting: keyof PathPoint;
}

export default function PointBooleanInput(props: PointBooleanInputProps) {
    const selectedPointID = useSelectedPointValue();
    const [point, setPoint] = usePathPoint(selectedPointID ?? DEFAULT_GUID);

    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!point)
            return;
        setPoint({ ...point, [props.setting]: e.target.checked });
    }, [props.setting, point, setPoint]);

    if (!point)
        return null;
    return (
        <Switch
            label={props.label}
            checked={(point[props.setting] ?? false) as boolean}
            onChange={onChange}
        />
    );
}