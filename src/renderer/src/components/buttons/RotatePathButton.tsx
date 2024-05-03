import { IconButton } from "@mui/material";
import useSettingsValue from "../../hooks/Utils/useSettings.ts";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import useRotatePath from "../../hooks/Path/useRotatePath.ts";

export interface RotatePathButtonProps {
    clockwise?: boolean;
}

export default function RotatePathButton(props: RotatePathButtonProps) {
    const { showOccupancyGrid } = useSettingsValue();
    const rotatePath = useRotatePath();

    if (showOccupancyGrid)
        return null;
    return (
        <IconButton
            aria-label={`Rotate Path ${props.clockwise ? "Clockwise" : "Counter-Clockwise"}`}
            onClick={() => rotatePath(props.clockwise)}
        >
            {props.clockwise ? <RotateRightIcon /> : <RotateLeftIcon />}
        </IconButton>
    )
}