import OccupancyTool from "../../types/OccupancyTool.ts";
import useOccupancyTool from "../../hooks/Occupancy/useOccupancyTool.ts";
import { IconButton } from "@mui/material";
import React from "react";
import BrushIcon from "@mui/icons-material/Brush";
import FillIcon from "@mui/icons-material/FormatColorFill";
import PanToolIcon from "@mui/icons-material/PanTool";

export interface OccupancyToolProps {
    tool: OccupancyTool;
}

export default function OccupancyToolButton(props: OccupancyToolProps) {
    const [tool, setTool] = useOccupancyTool();
    const targetTool = props.tool;

    const onClick = React.useCallback(() => {
        setTool(targetTool);
    }, [setTool, targetTool]);

    return (
        <IconButton
            aria-label={targetTool}
            color={tool === targetTool ? "primary" : "default"}
            onClick={onClick}
            size={"large"}
        >
            {targetTool === "Draw" && (
                <BrushIcon />
            )}
            {targetTool === "Fill" && (
                <FillIcon />
            )}
            {targetTool === "Pan" && (
                <PanToolIcon />
            )}
        </IconButton>
    );
}
