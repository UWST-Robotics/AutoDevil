import { useRawPath } from "../../hooks/Path/useRawPath.ts";
import React from "react";
import { normalizeRadians } from "../../utils/toDegrees.ts";
import useSavePathHistory from "../../hooks/Utils/useUndoHistory.ts";
import { IconButton } from "@mui/material";
import FlipIcon from '@mui/icons-material/Flip';

export interface MirrorPathButtonProps {
    vertical?: boolean;
}

export default function MirrorPathButton(props: MirrorPathButtonProps) {
    const [path, setPath] = useRawPath();
    const savePathHistory = useSavePathHistory();

    const { vertical } = props;

    const onClick = React.useCallback(() => {
        const newPoints = path.points.map((p) => ({
            ...p,
            x: vertical ? p.x : -p.x,
            y: vertical ? -p.y : p.y,
            r: normalizeRadians(vertical ? -p.r : Math.PI - p.r)
        }));
        setPath({
            ...path,
            points: newPoints,
        });
        savePathHistory();
    }, [path, setPath, vertical, savePathHistory]);

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