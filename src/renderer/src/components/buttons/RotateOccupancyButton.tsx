import React from "react";
import useSaveUndoHistory from "../../hooks/Utils/useUndoHistory.ts";
import { IconButton } from "@mui/material";
import useSettingsValue from "../../hooks/Utils/useSettings.ts";
import useOccupancy from "../../hooks/Occupancy/useOccupancy.ts";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';

export interface RotateOccupancyButtonProps {
    clockwise?: boolean;
}

export default function RotateOccupancyButton(props: RotateOccupancyButtonProps) {
    const { showOccupancyGrid } = useSettingsValue();
    const [occupancy, setOccupancy] = useOccupancy();
    const saveFileHistory = useSaveUndoHistory();

    const { clockwise } = props;

    const onClick = React.useCallback(() => {
        const newOccupancy = occupancy.map((r, x) => r.map((_, y) => {
            if (clockwise)
                return occupancy[y][occupancy[0].length - x - 1];
            return occupancy[occupancy.length - y - 1][x];
        }));
        setOccupancy(newOccupancy);
        saveFileHistory();
    }, [occupancy, setOccupancy, clockwise, saveFileHistory]);

    if (!showOccupancyGrid)
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