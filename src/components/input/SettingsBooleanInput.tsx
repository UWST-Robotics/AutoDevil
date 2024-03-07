import { Switch } from "@blueprintjs/core";
import Settings from "../../types/Settings.tsx";
import { useSettings } from "../../hooks/useSettings.ts";
import React from "react";

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
        <Switch
            label={props.label}
            checked={settings[props.setting] as boolean}
            onChange={onChange}
        />
    );
}