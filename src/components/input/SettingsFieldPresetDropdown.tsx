import { ItemRenderer, Select } from "@blueprintjs/select";
import FieldPreset, { FIELD_PRESETS } from "../../types/FieldPreset.ts";
import { Button, MenuItem } from "@blueprintjs/core";
import { useSetSettings } from "../../hooks/useSettings.ts";
import React from "react";

const filterFieldPreset = (query: string, fieldPreset: FieldPreset) => {
    return fieldPreset.name.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
        fieldPreset.type.toLowerCase().indexOf(query.toLowerCase()) >= 0;
}

const renderFieldPreset: ItemRenderer<FieldPreset> = (fieldPreset, { handleClick, modifiers }) => {
    if (!modifiers.matchesPredicate)
        return null;

    return (
        <MenuItem
            active={modifiers.active}
            key={fieldPreset.name}
            onClick={handleClick}
            text={fieldPreset.name}
            label={fieldPreset.type}
        />
    );

}

export default function SettingsFieldPresetDropdown() {
    const setSettings = useSetSettings();

    const onPresetSelect = React.useCallback((fieldPreset: FieldPreset) => {
        setSettings({
            fieldImage: fieldPreset.fieldImage,
            pixelsPerInch: fieldPreset.pixelsPerInch
        });
    }, [setSettings]);

    return (
        <Select
            fill
            items={FIELD_PRESETS}
            itemPredicate={filterFieldPreset}
            itemRenderer={renderFieldPreset}
            onItemSelect={onPresetSelect}
        >
            <Button
                fill
                text={"Field Preset"}
                rightIcon={"caret-down"}
            />
        </Select>
    );
}