import { useSettings } from "../../hooks/Utils/useSettings.ts";
import React from "react";
import { ListItem, ListItemText, ToggleButton, ToggleButtonGroup } from "@mui/material";


export default function SettingsSplineInput() {
    const [settings, setSettings] = useSettings();

    const onChange = React.useCallback((_: React.MouseEvent<HTMLElement>, value: string | null) => {
        setSettings({ ...settings, isSpline: value === "spline" });
    }, [settings, setSettings]);

    return (
        <ListItem disablePadding>
            <ListItemText primary={"Path Mode"} style={{ marginLeft: 10 }} />
            <ToggleButtonGroup
                color={"primary"}
                value={settings.isSpline ? "spline" : "linear"}
                exclusive
                onChange={onChange}
                size={"small"}
            >
                <ToggleButton value={"spline"}>Spline</ToggleButton>
                <ToggleButton value={"linear"}>Linear</ToggleButton>
            </ToggleButtonGroup>
        </ListItem>
    );
}