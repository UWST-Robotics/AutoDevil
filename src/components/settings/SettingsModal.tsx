import SettingsNumericInput from "./input/SettingsNumericInput.tsx";
import SettingsBooleanInput from "./input/SettingsBooleanInput.tsx";
import {Divider, List, Typography} from "@mui/material";
import SettingsImageUpload from "./input/SettingsImageUpload.tsx";
import InputGroup from "../common/input/InputGroup.tsx";
import GenericModal from "../common/GenericModal.tsx";
import useDialogVisible from "../../hooks/Utils/useDialogVisible.ts";
import SettingsHeader from "./SettingsHeader.tsx";

export default function SettingsModal() {
    const [isVisible, setVisible] = useDialogVisible("settings");

    return (
        <GenericModal
            title={"Settings"}
            isOpen={isVisible}
            onClose={() => setVisible(false)}
        >
            <List>
                <SettingsHeader>Field</SettingsHeader>
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

                <SettingsHeader>Robot</SettingsHeader>
                <SettingsBooleanInput label={"Holonomic"} setting={"isHolonomic"}/>
                <InputGroup>
                    <SettingsNumericInput label={"Robot Width"} info={"in"} setting={"robotWidth"}/>
                    <SettingsNumericInput label={"Robot Height"} info={"in"} setting={"robotHeight"}/>
                </InputGroup>
                <SettingsNumericInput label={"Safety Radius"} info={"in"} setting={"robotSafeRadius"}/>

                <SettingsHeader>Grid</SettingsHeader>
                <SettingsBooleanInput label={"Show Grid"} setting={"showGrid"}/>
                <SettingsBooleanInput label={"Snap Rotation"} setting={"snapRotation"}/>
                <SettingsBooleanInput label={"Snap Position"} setting={"snapPosition"}/>
                <SettingsBooleanInput label={"Show Edge Trail"} setting={"showEdgeTrail"}/>
                <SettingsBooleanInput label={"Show Step Number"} setting={"showStepNumber"}/>

                <SettingsHeader>Output Code</SettingsHeader>
                <SettingsNumericInput label={"Decimal Places"} setting={"numberOfDecimalPlaces"}/>
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