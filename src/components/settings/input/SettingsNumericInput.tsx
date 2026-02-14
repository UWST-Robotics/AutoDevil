import {useSettings} from "../../../hooks/Utils/useSettings.ts";
import React from "react";
import {InputAdornment, ListItem} from "@mui/material";
import FlexNumericInput from "../../common/input/FlexNumericInput.tsx";
import Settings from "../../../types/Settings.ts";

export interface SettingsNumericInputProps {
    label: string;
    setting: keyof Settings;
    info?: string;
}

export default function SettingsNumericInput(props: SettingsNumericInputProps) {
    const [settings, setSettings] = useSettings();

    const value = settings[props.setting] as number;
    const onChange = React.useCallback((newValue: number) => {
        setSettings({...settings, [props.setting]: newValue});
    }, [props.setting, settings, setSettings]);

    return (
        <ListItem disablePadding>
            <FlexNumericInput
                value={value}
                onChange={onChange}
                inputProps={{
                    InputProps: {
                        endAdornment: (<InputAdornment position="end">{props.info}</InputAdornment>)
                    },
                    fullWidth: true
                }}
            />
        </ListItem>
    );
}