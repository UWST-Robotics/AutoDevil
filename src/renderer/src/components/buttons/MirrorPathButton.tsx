import { useAutoData } from "../../hooks/Utils/useAutoData.ts";
import React from "react";
import { normalizeRadians } from "../../utils/toDegrees.ts";
import useSaveUndoHistory from "../../hooks/Utils/useUndoHistory.ts";
import { IconButton } from "@mui/material";
import FlipIcon from '@mui/icons-material/Flip';
import useSettingsValue from "../../hooks/Utils/useSettings.ts";

export interface MirrorPathButtonProps {
    vertical?: boolean;
}

export default function MirrorPathButton(props: MirrorPathButtonProps) {
    const { showOccupancyGrid, normalizeRotation } = useSettingsValue();
    const [path, setPath] = useAutoData();
    const savePathHistory = useSaveUndoHistory();

    const { vertical } = props;

    const onClick = React.useCallback(() => {
        let newPoints = path.points.map((p) => ({
            ...p,
            x: vertical ? p.x : -p.x,
            y: vertical ? -p.y : p.y,
            r: vertical ? -p.r : Math.PI - p.r
        }));

        if (normalizeRotation) {
            newPoints = newPoints.map((p) => ({
                ...p,
                r: normalizeRadians(p.r)
            }));
        }

        setPath({
            ...path,
            points: newPoints,
        });
        savePathHistory();
    }, [path, setPath, vertical, savePathHistory]);

    if (showOccupancyGrid)
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