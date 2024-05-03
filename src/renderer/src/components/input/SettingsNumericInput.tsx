import PathSettings from "../../types/Settings.tsx";
import { useSettings } from "../../hooks/Utils/useSettings.ts";
import React from "react";
import { InputAdornment, ListItem, TextField } from "@mui/material";

export interface SettingsNumericInputProps {
    label: string;
    setting: keyof PathSettings;
    info?: string;
}

export default function SettingsNumericInput(props: SettingsNumericInputProps) {
    const [settings, setSettings] = useSettings();

    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (isNaN(value))
            return;
        setSettings({ ...settings, [props.setting]: value });
    }, [props.setting, settings, setSettings]);

    return (
        <ListItem disablePadding>
            <TextField
                id={props.setting}
                label={props.label}
                variant={"standard"}
                type={"number"}
                fullWidth
                defaultValue={settings[props.setting] as number}
                onChange={onChange}
                InputProps={{
                    endAdornment: (<InputAdornment position="end">{props.info}</InputAdornment>)
                }}
                InputLabelProps={{
                    shrink: true
                }}
                style={{
                    margin: 5
                }}
            />
        </ListItem>
    );
}