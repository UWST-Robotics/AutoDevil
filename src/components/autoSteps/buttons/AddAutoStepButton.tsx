import {PlaylistAdd} from "@mui/icons-material";
import {alpha, Button, Menu, MenuItem, MenuProps, styled} from "@mui/material";
import React from "react";
import AutoStepTypes from "../../../db/AutoStepTypes.tsx";
import useAddAutoStep from "../../../hooks/AutoSteps/actions/useAddAutoStep.ts";
import AutoStepType from "../../../types/AutoSteps/AutoStepType.ts";
import createAutoStep from "../../../utils/createAutoStep.ts";

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({theme}) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: 'rgb(55, 65, 81)',
        boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
                ...theme.applyStyles('dark', {
                    color: 'inherit',
                }),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
        ...theme.applyStyles('dark', {
            color: theme.palette.grey[300],
        }),
    },
}));

export default function AddAutoStepButton() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const addAutoStep = useAddAutoStep();

    // Menu State
    const isMenuOpen = Boolean(anchorEl);
    const closeMenu = () => setAnchorEl(null);

    // Actions
    const selectType = (type: AutoStepType) => {
        addAutoStep(createAutoStep(type));
        closeMenu();
    };

    return (
        <>
            <Button
                onClick={e => setAnchorEl(e.currentTarget)}
                startIcon={<PlaylistAdd/>}
                variant={"outlined"}
                color={"secondary"}
                sx={{margin: 1}}
            >
                Add Auto Step
            </Button>
            <StyledMenu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={closeMenu}
                transformOrigin={{horizontal: "center", vertical: "top"}}
                anchorOrigin={{horizontal: "center", vertical: "bottom"}}
            >
                {AutoStepTypes.map((type, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => selectType(type)}
                    >
                        <type.icon/>
                        {type.name}
                    </MenuItem>
                ))}
            </StyledMenu>
        </>
    )
}