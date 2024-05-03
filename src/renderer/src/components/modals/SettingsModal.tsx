import SettingsNumericInput from "../input/SettingsNumericInput.tsx";
import SettingsBooleanInput from "../input/SettingsBooleanInput.tsx";
import { Box, Divider, Fade, IconButton, List, Modal, Typography } from "@mui/material";
import SettingsImageUpload from "../input/SettingsImageUpload.tsx";
import SettingsSwitchInput from "../input/SettingsSwitchInput.tsx";
import InputGroup from "../input/InputGroup.tsx";
import CloseIcon from "@mui/icons-material/Close";

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
                    <IconButton
                        aria-label={"Close Settings"}
                        onClick={props.onClose}
                        style={{ position: "absolute", top: 20, right: 20 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <List>
                        <SettingsImageUpload label={"Field Image"} setting={"fieldImage"} />
                        <InputGroup>
                            <SettingsNumericInput label={"Field Width"} info={"in"} setting={"fieldWidth"} />
                            <SettingsNumericInput label={"Field Height"} info={"in"} setting={"fieldHeight"} />
                        </InputGroup>
                        <InputGroup>
                            <SettingsNumericInput label={"Field Image Resolution"} info={"ppi"}
                                                  setting={"pixelsPerInch"} />
                            <SettingsNumericInput label={"Field Opacity"} info={"%"} setting={"fieldOpacity"} />
                        </InputGroup>
                        <InputGroup>
                            <SettingsNumericInput label={"Robot Width"} info={"in"} setting={"robotWidth"} />
                            <SettingsNumericInput label={"Robot Height"} info={"in"} setting={"robotHeight"} />
                        </InputGroup>
                        <SettingsNumericInput label={"Occupancy Resolution"} info={"in/cell"}
                                              setting={"occupancyInchesPerCell"} />
                        <SettingsSwitchInput
                            label={"Path Type"}
                            labelOn={"Spline"}
                            labelOff={"Linear"}
                            setting={"isSpline"}
                        />
                        <SettingsBooleanInput label={"Holonomic"} setting={"isHolonomic"} />
                        <SettingsBooleanInput label={"Normalize Rotation"} setting={"normalizeRotation"} />
                        <SettingsBooleanInput label={"Show Grid"} setting={"showGrid"} />
                        <SettingsBooleanInput label={"Snap Rotation"} setting={"snapRotation"} />
                        <SettingsBooleanInput label={"Snap Position"} setting={"snapPosition"} />
                    </List>
                    <Divider orientation={"horizontal"} style={{ marginBottom: 4 }} />
                    <Typography
                        variant={"caption"}
                        color={"text.secondary"}
                    >
                        AutoDevil &middot; Version {APP_VERSION}
                    </Typography>
                </Box>
            </Fade>
        </Modal>
    )
}