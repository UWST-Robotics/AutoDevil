import { useSettings } from "../../hooks/Utils/useSettings.ts";
import React from "react";
import { Box, ListItem, ListItemText, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Settings from "../../types/Settings.ts";

export interface SettingsSwitchInputProps {
    label: string;
    labelOn: string;
    labelOff: string;
    setting: keyof Settings;
}

export default function SettingsSwitchInput(props: SettingsSwitchInputProps) {
    const [settings, setSettings] = useSettings();

    const onChange = React.useCallback((_: React.MouseEvent<HTMLElement>, value: string | null) => {
        setSettings({
            ...settings,
            [props.setting]: value === "true"
        });
    }, [settings, setSettings]);

    return (
        <ListItem
            dense
            disablePadding
            secondaryAction={
                <ToggleButtonGroup
                    color={"primary"}
                    value={(settings[props.setting] as boolean) ? "true" : "false"}
                    exclusive
                    onChange={onChange}
                    size={"small"}
                    aria-labelledby={"settings-" + props.setting}
                >
                    <ToggleButton value={"false"} color={"primary"}>{props.labelOff}</ToggleButton>
                    <ToggleButton value={"true"} color={"secondary"}>{props.labelOn}</ToggleButton>
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
                    id={"settings-" + props.setting}
                    primary={props.label}
                />
            </Box>
        </ListItem>
    );
}