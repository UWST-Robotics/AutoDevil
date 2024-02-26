import React from "react";
import { Button } from "@blueprintjs/core";
import SettingsModal from "../modals/SettingsModal.tsx";

export default function SettingsButton() {
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

    return (
        <>
            <Button
                icon={"cog"}
                onClick={() => setIsModalOpen(true)}
            />
            <SettingsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}