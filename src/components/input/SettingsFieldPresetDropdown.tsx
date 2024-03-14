import FieldPreset, { FIELD_PRESETS } from "../../types/FieldPreset.ts";
import { useSetSettings } from "../../hooks/Utils/useSettings.ts";
import React from "react";
import { Button, ListItemText, Menu, MenuItem, Typography } from "@mui/material";


export default function SettingsFieldPresetDropdown() {
    const setSettings = useSetSettings();
    const [isMenuOpen, setMenuOpen] = React.useState(false);

    const onPresetSelect = React.useCallback((fieldPreset: FieldPreset) => {
        setSettings({
            fieldImage: fieldPreset.fieldImage,
            pixelsPerInch: fieldPreset.pixelsPerInch
        });
    }, [setSettings]);

    return (
        <div>
            <Button
                id={"field-preset-button"}
                aria-controls={isMenuOpen ? "field-preset-menu" : undefined}
                aria-haspopup={"true"}
                aria-expanded={isMenuOpen ? "true" : undefined}

                variant={"text"}
                color={"secondary"}
                onClick={() => setMenuOpen(true)}
            >
                Field Preset
            </Button>
            <Menu
                id={"field-preset-menu"}
                open={isMenuOpen}
                onClose={() => setMenuOpen(false)}
                MenuListProps={{
                    "aria-labelledby": "field-preset-button"
                }}
            >
                {FIELD_PRESETS.map((fieldPreset) => (
                    <MenuItem
                        key={fieldPreset.name}
                        dense
                        onClick={() => {
                            onPresetSelect(fieldPreset);
                            setMenuOpen(false);
                        }}
                    >
                        <ListItemText>
                            {fieldPreset.name}
                        </ListItemText>
                        <Typography
                            variant={"body2"}
                            color={"textSecondary"}
                        >
                            {fieldPreset.type}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}