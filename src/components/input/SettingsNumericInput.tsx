import { FormGroup, NumericInput } from "@blueprintjs/core";
import PathSettings from "../../types/Settings.tsx";
import { useSettings } from "../../hooks/Utils/useSettings.ts";
import React from "react";

export interface SettingsNumericInputProps {
    label: string;
    info?: string;
    setting: keyof PathSettings;
}

export default function SettingsNumericInput(props: SettingsNumericInputProps) {
    const [settings, setSettings] = useSettings();

    const onChange = React.useCallback((value: number) => {
        setSettings({ ...settings, [props.setting]: value });
    }, [props.setting, settings, setSettings]);

    return (
        <FormGroup
            label={props.label}
            labelFor={props.setting}
            labelInfo={props.info}
        >
            <NumericInput
                id={props.setting}
                placeholder={props.label}
                defaultValue={settings[props.setting] as number}
                onValueChange={onChange}
                min={0}
                minorStepSize={0.001}
                stepSize={0.1}
                majorStepSize={1}
            />
        </FormGroup>
    );
}