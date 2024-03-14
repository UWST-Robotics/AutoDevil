import PathSettings from "../../types/Settings.tsx";
import { useSettings } from "../../hooks/Utils/useSettings.ts";
import React from "react";
import { TextField } from "@mui/material";

export interface SettingsNumericInputProps {
    label: string;
    info?: string;
    setting: keyof PathSettings;
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
        <TextField
            id={props.setting}
            label={props.label}
            variant={"outlined"}
            type={"number"}
            InputLabelProps={{
                shrink: true,
            }}
            defaultValue={settings[props.setting] as number}
            onChange={onChange}
            style={{
                margin: 5
            }}
        />
    );
}