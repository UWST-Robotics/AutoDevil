import { useSettings } from "../../hooks/Utils/useSettings.ts";
import React from "react";
import { Box, ListItem, ListItemText, ToggleButton, ToggleButtonGroup } from "@mui/material";


export default function SettingsSplineInput() {
    const [settings, setSettings] = useSettings();

    const onChange = React.useCallback((_: React.MouseEvent<HTMLElement>, value: string | null) => {
        setSettings({ ...settings, isSpline: value === "spline" });
    }, [settings, setSettings]);

    return (
        <ListItem
            dense
            disablePadding
            secondaryAction={
                <ToggleButtonGroup
                    color={"primary"}
                    value={settings.isSpline ? "spline" : "linear"}
                    exclusive
                    onChange={onChange}
                    size={"small"}
                    aria-labelledby={"settings-spline"}
                >
                    <ToggleButton value={"spline"} color={"primary"}>Spline</ToggleButton>
                    <ToggleButton value={"linear"} color={"secondary"}>Linear</ToggleButton>
                </ToggleButtonGroup>
            }
        >
            <Box
                style={{
                    paddingLeft: 16,
                    paddingTop: 8,
                    paddingBottom: 8
                }}
            >
                <ListItemText
                    id={"settings-spline"}
                    primary={"Path Mode"}
                />
            </Box>
        </ListItem>
    );
}