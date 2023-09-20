import { Label, NumericInput } from "@blueprintjs/core";
import PathSettings from "../../types/Settings.tsx";
import { useSettings } from "../../hooks/useSettings.tsx";
import React from "react";

export interface SettingsNumericInputProps {
    label: string;
    setting: keyof PathSettings;
}

export default function SettingsNumericInput(props: SettingsNumericInputProps) {
    const [settings, setSettings] = useSettings();

    const onChange = React.useCallback((value: number) => {
        setSettings({ ...settings, [props.setting]: value });
    }, [props.setting, settings, setSettings]);

    return (
        <Label>
            {props.label}
            <NumericInput
                placeholder={props.label}
                value={settings[props.setting]}
                onValueChange={onChange}
                min={0}
            />
        </Label>
    );
}