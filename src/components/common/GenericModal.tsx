import {Box, Fade, IconButton, Modal, Typography} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

export interface GenericModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
    width?: number | string;
}

export default function GenericModal(props: GenericModalProps) {
    return (
        <Modal
            open={props.isOpen}
            onClose={props.onClose}
        >
            <Fade in={props.isOpen}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: props.width ?? 400,
                        bgcolor: 'background.paper',
                        borderRadius: 4,
                        p: 4
                    }}
                >
                    <IconButton
                        aria-label={"Close Settings"}
                        onClick={props.onClose}
                        style={{position: "absolute", top: 20, right: 20}}
                    >
                        <CloseIcon/>
                    </IconButton>

                    {props.title && (
                        <Typography
                            variant={"h2"}
                            color={"text.primary"}
                            style={{
                                fontWeight: "bold",
                                fontSize: 24,
                            }}
                        >
                            {props.title}
                        </Typography>
                    )}
                    {props.children}
                </Box>
            </Fade>
        </Modal>
    )
}