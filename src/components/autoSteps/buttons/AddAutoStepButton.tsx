import {PlaylistAdd} from "@mui/icons-material";
import {IconButton, Menu, MenuItem} from "@mui/material";
import React from "react";
import AutoStepTypes from "../../../db/AutoStepTypes.tsx";
import useAddAutoStep from "../../../hooks/AutoSteps/actions/useAddAutoStep.ts";
import AutoStepType from "../../../types/AutoSteps/AutoStepType.ts";

export default function AddAutoStepButton() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const addAutoStep = useAddAutoStep();

    // Menu State
    const isMenuOpen = Boolean(anchorEl);
    const closeMenu = () => setAnchorEl(null);

    // Actions
    const selectType = (type: AutoStepType<any>) => {
        addAutoStep(type.createNew());
        closeMenu();
    };

    return (
        <>
            <IconButton
                onClick={e => setAnchorEl(e.currentTarget)}
            >
                <PlaylistAdd/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={closeMenu}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {AutoStepTypes.map((type, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => selectType(type)}
                    >
                        {type.name}
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}