import {ListItem, ListItemProps} from "@mui/material";

export interface AutoStepsListItemProps extends ListItemProps {
    backgroundColor: string;
}

export default function AutoStepsListItemContainer(props: AutoStepsListItemProps) {
    const listItemProps: Partial<AutoStepsListItemProps> = {...props};
    delete listItemProps.backgroundColor;

    return (
        <ListItem
            {...listItemProps}
            sx={{
                // Selected
                "&& .Mui-selected, && .Mui-selected:hover": {
                    bgcolor: props.backgroundColor
                },
                // Hover
                "& .MuiListItemButton-root:hover": {
                    bgcolor: props.backgroundColor
                },
                // Text
                color: props.color,
                // Left Icon
                "& .MuiListItemIcon-root": {
                    color: props.color
                },
                // Second Icon
                "& .MuiIconButton-root": {
                    color: props.color
                }
            }}
        >
            {props.children}
        </ListItem>
    )
}