import { Switch } from "@blueprintjs/core";
import Settings from "../../types/Settings.tsx";
import { useSettings } from "../../hooks/useSettings.ts";
import React from "react";

export interface SettingsBooleanInputProps {
    label: string;
    defaultValue?: boolean;
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
            checked={(settings[props.setting] ?? props.defaultValue ?? false) as boolean}
            onChange={onChange}
        />
    );
}