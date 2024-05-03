import FieldPreset, { FIELD_PRESETS } from "../../types/FieldPreset.ts";
import { useSetSettings } from "../../hooks/Utils/useSettings.ts";
import React from "react";
import { Button, ListItemText, Menu, MenuItem, Typography } from "@mui/material";
import DropdownIcon from "@mui/icons-material/ArrowDropDown";


export default function SettingsFieldPresetDropdown() {
    const setSettings = useSetSettings();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [isMenuOpen, setMenuOpen] = React.useState(false);

    const onButtonClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setMenuOpen(true);
    }, [setAnchorEl, setMenuOpen]);

    const onPresetSelect = React.useCallback((fieldPreset: FieldPreset) => {
        setSettings({
            fieldImage: fieldPreset.fieldImage,
            pixelsPerInch: fieldPreset.pixelsPerInch
        });
    }, [setSettings]);

    return (
        <>
            <Button
                id={"field-preset-button"}
                aria-controls={isMenuOpen ? "field-preset-menu" : undefined}
                aria-haspopup={"true"}
                aria-expanded={isMenuOpen ? "true" : undefined}

                variant={"outlined"}
                color={"primary"}
                onClick={onButtonClick}

                endIcon={<DropdownIcon />}
            >
                Field Preset
            </Button>
            <Menu
                id={"field-preset-menu"}
                open={isMenuOpen}
                onClose={() => setMenuOpen(false)}
                anchorEl={anchorEl}
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
                            style={{ marginLeft: 10 }}
                        >
                            {fieldPreset.type}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}