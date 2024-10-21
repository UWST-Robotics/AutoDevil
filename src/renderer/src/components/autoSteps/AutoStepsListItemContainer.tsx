import {ListItem, ListItemProps} from "@mui/material";

export interface AutoStepsListItemProps extends ListItemProps {
    intent?: "primary" | "success" | "danger";
}

const SUCCESS_BG = "#193d1d";
const SUCCESS_FG = "success.light";
const PRIMARY_BG = "#19333d";
const PRIMARY_FG = "primary.main";
const DANGER_BG = "#3d1919";
const DANGER_FG = "error.light";

export default function AutoStepsListItemContainer(props: AutoStepsListItemProps) {
    const listItemProps = {...props};
    delete listItemProps.intent;

    const background = props.intent === "primary" ? PRIMARY_BG : props.intent === "success" ? SUCCESS_BG : DANGER_BG;
    const foreground = props.intent === "primary" ? PRIMARY_FG : props.intent === "success" ? SUCCESS_FG : DANGER_FG;

    return (
        <ListItem
            {...listItemProps}
            sx={{
                // Selected
                "&& .Mui-selected, && .Mui-selected:hover": {
                    bgcolor: background
                },
                // Hover
                "& .MuiListItemButton-root:hover": {
                    bgcolor: background
                },
                // Text
                color: foreground,
                // Left Icon
                "& .MuiListItemIcon-root": {
                    color: foreground
                },
                // Second Icon
                "& .MuiIconButton-root": {
                    color: foreground
                }
            }}
        >
            {props.children}
        </ListItem>
    )
}