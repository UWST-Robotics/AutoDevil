import { IconButton } from "@mui/material";
import FlipIcon from '@mui/icons-material/Flip';
import useSettingsValue from "../../hooks/Utils/useSettings.ts";
import useMirrorPath from "../../hooks/Path/useMirrorPath.ts";

export interface MirrorPathButtonProps {
    vertical?: boolean;
}

export default function MirrorPathButton(props: MirrorPathButtonProps) {
    const { showOccupancyGrid } = useSettingsValue();
    const mirrorPath = useMirrorPath();

    if (showOccupancyGrid)
        return null;
    return (
        <IconButton
            aria-label={`Mirror Path ${props.vertical ? "Vertically" : "Horizontally"}`}
            onClick={() => mirrorPath(props.vertical)}
        >
            <FlipIcon
                sx={{
                    transform: props.vertical ? "rotate(90deg)" : "rotate(0deg)"
                }}
            />
        </IconButton>
    )
}