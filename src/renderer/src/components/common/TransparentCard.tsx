import React from "react";

export interface TransparentCardProps {
    children?: React.ReactNode;
}

export default function TransparentCard(props: TransparentCardProps) {
    return (
        <div
            style={{
                borderRadius: 16,
                margin: 10,
                padding: 10,
                backgroundColor: "#00000077",
                pointerEvents: "auto",
                textAlign: "center",
                width: "100%"
            }}
        >
            {props.children}
        </div>
    )
}