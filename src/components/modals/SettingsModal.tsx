import SettingsNumericInput from "../input/SettingsNumericInput.tsx";
import SettingsBooleanInput from "../input/SettingsBooleanInput.tsx";
import SettingsImageUpload from "../input/SettingsImageUpload.tsx";
import { Box, Fade, Modal } from "@mui/material";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsModal(props: SettingsModalProps) {
    return (
        <Modal
            aria-labelledby={"settings-modal-title"}
            open={props.isOpen}
            onClose={props.onClose}
        >
            <Fade in={props.isOpen}>
                <Box sx={modalStyle}>
                    <h2 id="settings-modal-title">
                        Settings
                    </h2>

                    <SettingsImageUpload label={"Field Image"} setting={"fieldImage"} />
                    <SettingsNumericInput label={"Pixels Per Inch"} setting={"pixelsPerInch"} />
                    <SettingsNumericInput label={"Robot Width"} info={"(in)"} setting={"robotWidth"} />
                    <SettingsNumericInput label={"Robot Height"} info={"(in)"} setting={"robotHeight"} />
                    <SettingsBooleanInput label={"Holonomic Mode"} setting={"isHolonomic"} />
                    <SettingsBooleanInput label={"Spline Mode"} setting={"isSpline"} />
                    <SettingsBooleanInput label={"Snap Rotation"} setting={"snapRotation"} />
                    <SettingsBooleanInput label={"Snap Position"} setting={"snapPosition"} />
                </Box>
            </Fade>
        </Modal>
    )
}