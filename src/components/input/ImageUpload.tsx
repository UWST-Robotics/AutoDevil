import React from "react";
import openUploadDialog from "../../utils/openUploadDialog.ts";
import { Button, ButtonGroup } from "@mui/material";
import ReplayIcon from '@mui/icons-material/Replay';
import FileUploadIcon from '@mui/icons-material/FileUpload';

interface ImageUploadProps {
    label: string;
    spriteURL: string;
    onUpload: (spriteURL: string) => void;
    onReset: () => void;
}

export default function ImageUpload(props: ImageUploadProps) {
    const [isHovering, setIsHovering] = React.useState(false);

    const onUploadClick = React.useCallback(() => {
        openUploadDialog("image/*").then((result) => {
            if (result)
                props.onUpload(result);
        });
    }, [props.onUpload]);

    const onFileDrop = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsHovering(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target?.result)
                        props.onUpload(e.target.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                //toaster.danger(t("sprite.errorInvalidType"));
            }
        }
    }, [props.onUpload]);

    return (
        <div
            onDragOver={(e) => {
                e.preventDefault();
                setIsHovering(true);
            }}
            onDragLeave={(e) => {
                e.preventDefault();
                setIsHovering(false);
            }}
            onDrop={onFileDrop}
        >
            {/* Image Preview */}
            <div style={{ textAlign: "center", padding: 15 }}>
                <img
                    style={{
                        maxHeight: 100,
                        maxWidth: 100
                    }}
                    src={props.spriteURL}
                    alt={props.label}
                />
            </div>

            {/* Buttons */}
            <ButtonGroup fullWidth>
                <Button
                    onClick={onUploadClick}
                    color={"success"}
                    variant={"contained"}
                >
                    <FileUploadIcon />
                </Button>

                <Button
                    onClick={props.onReset}
                    disabled={props.spriteURL === undefined}
                    color={"error"}
                    variant={"contained"}
                >
                    <ReplayIcon />
                </Button>
            </ButtonGroup>

            {/* Drag & Drop File Upload */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 5,
                    right: 5,
                    bottom: 5,
                    borderRadius: 5,
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    opacity: isHovering ? 1 : 0,
                    transition: "opacity 0.1s",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    zIndex: 1000,
                    pointerEvents: "none",
                }}>

                <FileUploadIcon />
                <span style={{
                    fontSize: 20,
                    fontWeight: "bold",
                }}>
                    Upload Image
                </span>
                <span style={{
                    fontSize: 14,
                }}>
                    {props.label}
                </span>
            </div>
        </div>
    );
}
