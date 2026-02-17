import {Button} from "@mui/material";
import React from "react";
import {Check, ContentCopy, Error} from "@mui/icons-material";

export interface CopyToClipboardButtonProps {
    text: string;
}

export default function CopyToClipboardButton(props: CopyToClipboardButtonProps) {
    const [copyState, setCopyState] = React.useState<"idle" | "copied" | "error">("idle");

    const onClick = () => {
        navigator.clipboard.writeText(props.text)
            .then(() => {
                setCopyState("copied");
            })
            .catch((err) => {
                console.error("Failed to copy text to clipboard: ", err);
                setCopyState("error");
            });
    };

    return (
        <Button
            variant={"contained"}
            color={copyState === "copied" ? "success" : copyState === "error" ? "error" : "primary"}
            onClick={onClick}
            style={{margin: 10}}
            endIcon={copyState === "copied" ? <Check/> :
                copyState === "error" ? <Error/> :
                    <ContentCopy/>}
        >
            Copy to Clipboard
        </Button>
    );
}