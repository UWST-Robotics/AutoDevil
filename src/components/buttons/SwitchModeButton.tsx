import { IconButton, Tooltip } from "@mui/material";
import { useSettings } from "../../hooks/Utils/useSettings.ts";
import React from "react";
import GridIcon from '@mui/icons-material/Grid3x3';
import RouteIcon from '@mui/icons-material/Route';

export default function SwitchModeButton() {
    const [settings, setSettings] = useSettings();

    const onClick = React.useCallback(() => {
        setSettings({
            ...settings,
            showOccupancyGrid: !settings.showOccupancyGrid
        })
    }, [settings, setSettings]);

    const label = settings.showOccupancyGrid ? "Switch to Path" : "Switch to Occupancy Grid";

    return (
        <Tooltip title={label}>
            <IconButton
                aria-label={label}
                onClick={onClick}
            >
                {settings.showOccupancyGrid ? <GridIcon /> : <RouteIcon />}
            </IconButton>
        </Tooltip>
    );
}