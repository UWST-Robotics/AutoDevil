import SettingsNumericInput from "./input/SettingsNumericInput.tsx";
import SettingsBooleanInput from "./input/SettingsBooleanInput.tsx";
import {Divider, List, Typography} from "@mui/material";
import SettingsImageUpload from "./input/SettingsImageUpload.tsx";
import SettingsSwitchInput from "./input/SettingsSwitchInput.tsx";
import InputGroup from "../common/input/InputGroup.tsx";
import GenericModal from "../common/GenericModal.tsx";
import useDialogVisible from "../../hooks/Utils/useDialogVisible.ts";

export default function SettingsModal() {
    const [isVisible, setVisible] = useDialogVisible("settings");

    return (
        <GenericModal
            title={"Settings"}
            isOpen={isVisible}
            onClose={() => setVisible(false)}
        >
            <List>
                <SettingsImageUpload label={"Field Image"} setting={"fieldImage"}/>
                <InputGroup>
                    <SettingsNumericInput label={"Field Width"} info={"in"} setting={"fieldWidth"}/>
                    <SettingsNumericInput label={"Field Height"} info={"in"} setting={"fieldHeight"}/>
                </InputGroup>
                <InputGroup>
                    <SettingsNumericInput label={"Field Image Resolution"} info={"ppi"}
                                          setting={"pixelsPerInch"}/>
                    <SettingsNumericInput label={"Field Opacity"} info={"%"} setting={"fieldOpacity"}/>
                </InputGroup>
                <InputGroup>
                    <SettingsNumericInput label={"Robot Width"} info={"in"} setting={"robotWidth"}/>
                    <SettingsNumericInput label={"Robot Height"} info={"in"} setting={"robotHeight"}/>
                </InputGroup>
                <SettingsNumericInput label={"Occupancy Resolution"} info={"in/cell"}
                                      setting={"occupancyInchesPerCell"}/>
                <SettingsSwitchInput
                    label={"Path Type"}
                    labelOn={"Spline"}
                    labelOff={"Linear"}
                    setting={"isSpline"}
                />
                <SettingsBooleanInput label={"Holonomic"} setting={"isHolonomic"}/>
                <SettingsBooleanInput label={"Normalize Rotation"} setting={"normalizeRotation"}/>
                <SettingsBooleanInput label={"Show Grid"} setting={"showGrid"}/>
                <SettingsBooleanInput label={"Snap Rotation"} setting={"snapRotation"}/>
                <SettingsBooleanInput label={"Snap Position"} setting={"snapPosition"}/>
            </List>
            <Divider orientation={"horizontal"} style={{marginBottom: 4}}/>
            <Typography
                variant={"caption"}
                color={"text.secondary"}
            >
                AutoDevil &middot; Version {APP_VERSION}
            </Typography>
        </GenericModal>
    )
}