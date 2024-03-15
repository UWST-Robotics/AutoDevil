import Settings from "../../types/Settings.tsx";
import { useSettings } from "../../hooks/Utils/useSettings.ts";
import React from "react";
import { Checkbox, ListItem, ListItemButton, ListItemText } from "@mui/material";

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
        <ListItem
            dense
            disablePadding
            secondaryAction={
                <Checkbox
                    edge={"end"}
                    checked={settings[props.setting] as boolean}
                    onClick={onClick}
                    aria-labelledby={"settings-" + props.setting}
                />
            }
        >
            <ListItemButton
                onClick={onClick}
            >
                <ListItemText
                    id={"settings-" + props.setting}
                    primary={props.label}
                />
            </ListItemButton>
        </ListItem>
    );
}