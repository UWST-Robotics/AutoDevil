import useIsAnimating from "../../hooks/Canvas/useIsAnimating.ts";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import React from "react";
import { IconButton } from "@mui/material";


export default function AnimateButton() {
    const [isAnimating, setIsAnimating] = useIsAnimating();

    const onClick = React.useCallback(() => {
        setIsAnimating(!isAnimating);
    }, [isAnimating, setIsAnimating]);

    return (
        <IconButton
            aria-label={isAnimating ? "Stop Animation" : "Start Animation"}
            onClick={onClick}
        >
            {isAnimating ? (<StopIcon />) : (<PlayArrowIcon />)}
        </IconButton>
    )
}