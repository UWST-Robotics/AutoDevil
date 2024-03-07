import { Dialog, DialogBody } from "@blueprintjs/core";
import SettingsNumericInput from "../input/SettingsNumericInput.tsx";
import SettingsBooleanInput from "../input/SettingsBooleanInput.tsx";
import SettingsImageUpload from "../input/SettingsImageUpload.tsx";
import SettingsFieldPresetDropdown from "../input/SettingsFieldPresetDropdown.tsx";

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

                <SettingsImageUpload label={"Field Image"} setting={"fieldImage"} />
                <SettingsFieldPresetDropdown />
                <SettingsNumericInput label={"Pixels Per Inch"} setting={"pixelsPerInch"} />
                <SettingsNumericInput label={"Robot Width"} info={"(in)"} setting={"robotWidth"} />
                <SettingsNumericInput label={"Robot Height"} info={"(in)"} setting={"robotHeight"} />
                <SettingsBooleanInput label={"Holonomic Mode"} setting={"isHolonomic"} />
                <SettingsBooleanInput label={"Spline Mode"} setting={"isSpline"} />
                <SettingsBooleanInput label={"Snap Rotation"} setting={"snapRotation"} />
                <SettingsBooleanInput label={"Snap Position"} setting={"snapPosition"} />
            </DialogBody>
        </Dialog>
    )
}