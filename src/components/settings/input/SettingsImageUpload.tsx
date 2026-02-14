import PathSettings from "../../types/Settings.tsx";
import {useSettings} from "../../../hooks/Utils/useSettings.ts";
import React from "react";
import {DEFAULT_SETTINGS} from "../../../types/Settings.ts";
import openUploadDialog from "../../../utils/openUploadDialog.ts";
import {Avatar, Button, ButtonGroup, ListItem, ListItemAvatar} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ReplayIcon from "@mui/icons-material/Replay";
import SettingsFieldPresetDropdown from "./SettingsFieldPresetDropdown.tsx";

export interface SettingsBooleanInputProps {
    label: string;
    setting: keyof PathSettings;
}

export default function SettingsImageUpload(props: SettingsBooleanInputProps) {
    const [settings, setSettings] = useSettings();

    const onUpload = React.useCallback(() => {
        openUploadDialog("image/*").then((result) => {
            if (result)
                setSettings({...settings, [props.setting]: result});
        });
    }, [props]);

    const onReset = React.useCallback(() => {
        setSettings({...settings, [props.setting]: DEFAULT_SETTINGS[props.setting]});
    }, [props.setting, settings, setSettings]);

    return (
        <ListItem
            secondaryAction={
                <ButtonGroup>
                    <SettingsFieldPresetDropdown/>
                    <Button
                        onClick={onUpload}
                        color={"success"}
                        variant={"outlined"}
                    >
                        <FileUploadIcon/>
                    </Button>

                    <Button
                        onClick={onReset}
                        color={"error"}
                        variant={"outlined"}
                    >
                        <ReplayIcon/>
                    </Button>
                </ButtonGroup>
            }
        >
            {/* Image Preview */}
            <ListItemAvatar>
                <Avatar
                    alt={props.label}
                    src={settings[props.setting] as string}
                    variant={"square"}
                />
            </ListItemAvatar>
        </ListItem>
    );
}