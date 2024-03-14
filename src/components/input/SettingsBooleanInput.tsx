import Settings from "../../types/Settings.tsx";
import { useSettings } from "../../hooks/Utils/useSettings.ts";
import React from "react";
import { FormControlLabel, Switch } from "@mui/material";

export interface SettingsBooleanInputProps {
    label: string;
    setting: keyof Settings;
}

export default function SettingsBooleanInput(props: SettingsBooleanInputProps) {
    const [settings, setSettings] = useSettings();

    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSettings({ ...settings, [props.setting]: e.target.checked });
    }, [props.setting, settings, setSettings]);

    return (
        <FormControlLabel
            label={props.label}
            control={
                <Switch
                    checked={settings[props.setting] as boolean}
                    onChange={onChange}
                />
            }
        />
    );
}