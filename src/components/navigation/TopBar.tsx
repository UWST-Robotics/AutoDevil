import { ButtonGroup } from "@blueprintjs/core";
import SettingsButton from "../buttons/SettingsButton.tsx";
import DownloadButton from "../buttons/DownloadButton.tsx";
import UploadButton from "../buttons/UploadButton.tsx";
import SettingsFieldPresetDropdown from "../input/SettingsFieldPresetDropdown.tsx";
import MirrorPathButton from "../buttons/MirrorPathButton.tsx";

export default function TopBar() {

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: 10,
                pointerEvents: "none"
            }}
        >
            <ButtonGroup
                style={{
                    pointerEvents: "auto"
                }}
            >
                <DownloadButton />
                <UploadButton />
                <MirrorPathButton />
                <MirrorPathButton vertical />
                <SettingsButton />
                <SettingsFieldPresetDropdown />
            </ButtonGroup>
        </div>
    )
}