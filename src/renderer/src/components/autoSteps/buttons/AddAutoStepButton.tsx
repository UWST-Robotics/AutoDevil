import {PlaylistAdd} from "@mui/icons-material";
import {IconButton, Menu, MenuItem} from "@mui/material";
import React from "react";
import AutoStepTypes from "../../../db/AutoStepTypes.tsx";
import useAddAutoStep from "../../../hooks/AutoSteps/useAddAutoStep.ts";
import AutoStepInfo from "../../../types/AutoSteps/AutoStepInfo.ts";


export default function AddAutoStepButton() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const addAutoStep = useAddAutoStep();

    // Menu State
    const isMenuOpen = Boolean(anchorEl);
    const closeMenu = () => setAnchorEl(null);

    // Actions
    const selectType = (type: AutoStepInfo) => {
        addAutoStep(type.create());
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
                {AutoStepTypes
                    .filter(type => !type.isHidden)
                    .map(type => (
                        <MenuItem
                            key={type.type}
                            onClick={() => selectType(type)}
                        >
                            {type.name}
                        </MenuItem>
                    ))
                }
            </Menu>
        </>
    )
}