import PathSettings from "../../types/Settings.tsx";
import { useSettings } from "../../hooks/Utils/useSettings.ts";
import React from "react";
import ImageUpload from "./ImageUpload.tsx";
import { DEFAULT_SETTINGS } from "../../types/Settings.ts";

export interface SettingsBooleanInputProps {
    label: string;
    setting: keyof PathSettings;
}

export default function SettingsImageUpload(props: SettingsBooleanInputProps) {
    const [settings, setSettings] = useSettings();

    const onUpload = React.useCallback((imageData: string) => {
        setSettings({ ...settings, [props.setting]: imageData });
    }, [props.setting, settings, setSettings]);

    const onReset = React.useCallback(() => {
        setSettings({ ...settings, [props.setting]: DEFAULT_SETTINGS[props.setting] });
    }, [props.setting, settings, setSettings]);

    return (
        <ImageUpload
            label={props.label}
            spriteURL={settings[props.setting] as string}
            onUpload={onUpload}
            onReset={onReset}
        />
    );
}