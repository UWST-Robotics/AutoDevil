import { Dialog, DialogBody } from "@blueprintjs/core";
import SettingsNumericInput from "../input/SettingsNumericInput.tsx";

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsModal(props: SettingsModalProps) {
    return (
        <Dialog
            isOpen={props.isOpen}
            onClose={props.onClose}
            title={"Settings"}
        >
            <DialogBody>
                <SettingsNumericInput label={"Pixels Per Inch"} setting={"pixelsPerInch"} />
                <SettingsNumericInput label={"Robot Width (in)"} setting={"robotWidth"} />
                <SettingsNumericInput label={"Robot Height (in)"} setting={"robotHeight"} />
            </DialogBody>
        </Dialog>
    )
}