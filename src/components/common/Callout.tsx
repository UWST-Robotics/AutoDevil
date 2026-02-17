import React from "react";
import {Alert, Collapse} from "@mui/material";

export interface MapErrorProps {
    icon?: React.ReactNode,
    children?: React.ReactNode,
    type?: "error" | "info",
}

export default function Callout(props: MapErrorProps) {
    const [isVisible, _setVisible] = React.useState(true);

    const isInfo = props.type === "info" || !props.type;

    return (
        <Collapse in={isVisible}>
            <Alert
                severity={isInfo ? "info" : "warning"}
                icon={props.icon}
                style={{
                    borderBottom: `3px solid ${isInfo ? "rgb(37, 93, 128)" : "rgb(146, 100, 53)"}`,
                    borderRadius: 0
                }}
            >
                {props.children}
            </Alert>
        </Collapse>
    );
}
