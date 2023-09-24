import React from "react";
import { Button } from "@blueprintjs/core";
import GraphModal from "../modals/GraphModal.tsx";

export default function GraphButton() {
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

    return (
        <>
            <Button
                icon={"timeline-line-chart"}
                intent={"primary"}
                onClick={() => setIsModalOpen(true)}
            />

            {/* Normally hiding/showing the modal is handled through props.
                However, this ensures expensive computations are not performed.*/}
            {isModalOpen && (
                <GraphModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
}