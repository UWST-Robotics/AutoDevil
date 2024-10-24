import React from "react";
import SettingsModal from "./SettingsModal.tsx";
import {IconButton} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';

export default function SettingsButton() {
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

    return (
        <>
            <IconButton
                aria-label={"Settings"}
                onClick={() => setIsModalOpen(true)}
            >
                <SettingsIcon/>
            </IconButton>
            <SettingsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}