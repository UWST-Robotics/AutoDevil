import React from "react";
import useSaveUndoHistory from "../../hooks/Utils/useUndoHistory.ts";
import { IconButton } from "@mui/material";
import FlipIcon from '@mui/icons-material/Flip';
import useSettingsValue from "../../hooks/Utils/useSettings.ts";
import useOccupancy from "../../hooks/Occupancy/useOccupancy.ts";

export interface MirrorOccupancyButtonProps {
    vertical?: boolean;
}

export default function MirrorOccupancyButton(props: MirrorOccupancyButtonProps) {
    const { showOccupancyGrid } = useSettingsValue();
    const [occupancy, setOccupancy] = useOccupancy();
    const saveFileHistory = useSaveUndoHistory();

    const { vertical } = props;

    const onClick = React.useCallback(() => {
        const newOccupancy = occupancy.map((r, x) => r.map((_, y) => {
            if (vertical)
                return occupancy[x][occupancy[0].length - y - 1];
            return occupancy[occupancy.length - x - 1][y];
        }));
        setOccupancy(newOccupancy);
        saveFileHistory();
    }, [occupancy, setOccupancy, vertical, saveFileHistory]);

    if (!showOccupancyGrid)
        return null;
    return (
        <IconButton
            aria-label={`Mirror Path ${vertical ? "Vertically" : "Horizontally"}`}
            onClick={onClick}
        >
            <FlipIcon
                sx={{
                    transform: vertical ? "rotate(90deg)" : "rotate(0deg)"
                }}
            />
        </IconButton>
    )
}