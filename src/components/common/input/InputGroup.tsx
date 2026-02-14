import React from "react";
import { Box } from "@mui/material";

export interface InputGroupProps {
    children: React.ReactNode;
}

export default function InputGroup(props: InputGroupProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
            }}
        >
            {props.children}
        </Box>
    );
}
