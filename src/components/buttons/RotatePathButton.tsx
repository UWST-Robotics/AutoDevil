import { useAutoData } from "../../hooks/Utils/useAutoData.ts";
import React from "react";
import { normalizeRadians } from "../../utils/toDegrees.ts";
import useSaveUndoHistory from "../../hooks/Utils/useUndoHistory.ts";
import { IconButton } from "@mui/material";
import useSettingsValue from "../../hooks/Utils/useSettings.ts";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';

export interface RotatePathButtonProps {
    clockwise?: boolean;
}

export default function RotatePathButton(props: RotatePathButtonProps) {
    const { showOccupancyGrid } = useSettingsValue();
    const [path, setPath] = useAutoData();
    const savePathHistory = useSaveUndoHistory();

    const { clockwise } = props;

    const onClick = React.useCallback(() => {
        const newPoints = path.points.map((p) => ({
            ...p,
            x: clockwise ? -p.y : p.y,
            y: clockwise ? p.x : -p.x,
            r: normalizeRadians(clockwise ? p.r + Math.PI / 2 : p.r - Math.PI / 2)
        }));
        setPath({
            ...path,
            points: newPoints,
        });
        savePathHistory();
    }, [path, setPath, clockwise, savePathHistory]);

    if (showOccupancyGrid)
        return null;
    return (
        <IconButton
            aria-label={`Rotate Path ${clockwise ? "Clockwise" : "Counter-Clockwise"}`}
            onClick={onClick}
        >
            {clockwise ? <RotateRightIcon /> : <RotateLeftIcon />}
        </IconButton>
    )
}