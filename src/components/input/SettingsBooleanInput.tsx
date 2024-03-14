import Settings from "../../types/Settings.tsx";
import { useSettings } from "../../hooks/Utils/useSettings.ts";
import React from "react";
import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export interface SettingsBooleanInputProps {
    label: string;
    setting: keyof Settings;
}

export default function SettingsBooleanInput(props: SettingsBooleanInputProps) {
    const [settings, setSettings] = useSettings();

    const onClick = React.useCallback(() => {
        const value = settings[props.setting] as boolean;
        setSettings({ ...settings, [props.setting]: !value });
    }, [props.setting, settings, setSettings]);

    return (
        <ListItem disablePadding>
            <ListItemButton
                onClick={onClick}
                dense
            >
                <ListItemIcon>
                    <Checkbox
                        edge={"start"}
                        checked={settings[props.setting] as boolean}
                        tabIndex={-1}
                        disableRipple
                    />
                </ListItemIcon>
                <ListItemText primary={props.label} />
            </ListItemButton>
        </ListItem>
    );
}