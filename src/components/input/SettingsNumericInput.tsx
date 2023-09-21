import { Label, NumericInput } from "@blueprintjs/core";
import PathSettings from "../../types/Settings.tsx";
import { useSettings } from "../../hooks/useSettings.ts";
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
                value={settings[props.setting] as number}
                onValueChange={onChange}
                min={0}
                minorStepSize={0.001}
                stepSize={0.1}
                majorStepSize={1}
            />
        </Label>
    );
}