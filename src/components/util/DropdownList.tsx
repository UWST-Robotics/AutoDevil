import React from "react";
import { Collapse, Divider, List, ListItemButton, ListItemText } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export interface DropdownElement<T> {
    id: T;
    name: string;
    isDisabled?: boolean;
}

export interface DropdownListProps<T> {
    elements: DropdownElement<T>[];
    onSelectID: (id?: T) => void;

    selectedID?: T;
    children?: React.ReactNode;
    renderElement?: (element: DropdownElement<T>) => React.ReactNode;
}

export default function DropdownList<T>(props: DropdownListProps<T>) {
    return (
        <List
            style={{
                backgroundColor: "revert",
                paddingTop: 0
            }}
        >
            {props.elements?.map((element, index) => (
                <div key={element.id + "-" + index}>
                    <ListItemButton
                        disabled={element.isDisabled}
                        selected={element.id == props.selectedID}
                        onClick={() => props.onSelectID(element.id == props.selectedID ? undefined : element.id)}
                        dense
                    >
                        <ListItemText>
                            {element.name}
                        </ListItemText>
                        <ExpandLessIcon
                            style={{
                                transform: props.selectedID == element.id ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.2s ease-in-out"
                            }}
                        />
                    </ListItemButton>
                    <Collapse in={props.selectedID == element.id && !element.isDisabled}>
                        {props.children}
                        {props.renderElement && props.renderElement(element)}
                        <Divider orientation={"horizontal"} />
                    </Collapse>
                </div>
            ))}
        </List>
    );
}