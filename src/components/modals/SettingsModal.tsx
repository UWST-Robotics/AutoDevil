import SettingsNumericInput from "../input/SettingsNumericInput.tsx";
import SettingsBooleanInput from "../input/SettingsBooleanInput.tsx";
import { Box, Fade, List, Modal } from "@mui/material";
import SettingsImageUpload from "../input/SettingsImageUpload.tsx";
import SettingsSplineInput from "../input/SettingsSplineInput.tsx";

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
                    <h2
                        id="settings-modal-title"
                        style={{ marginTop: 0 }}
                    >
                        Settings
                    </h2>
                    <List>
                        <SettingsImageUpload label={"Field Image"} setting={"fieldImage"} />
                        <SettingsNumericInput label={"Field Resolution"} info={"ppi"} setting={"pixelsPerInch"} />
                        <SettingsNumericInput label={"Robot Width"} info={"in"} setting={"robotWidth"} />
                        <SettingsNumericInput label={"Robot Height"} info={"in"} setting={"robotHeight"} />
                        <SettingsSplineInput />
                        <SettingsBooleanInput label={"Holonomic"} setting={"isHolonomic"} />
                        <SettingsBooleanInput label={"Snap Rotation"} setting={"snapRotation"} />
                        <SettingsBooleanInput label={"Snap Position"} setting={"snapPosition"} />
                    </List>
                </Box>
            </Fade>
        </Modal>
    )
}