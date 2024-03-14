import SettingsButton from "../buttons/SettingsButton.tsx";
import DownloadButton from "../buttons/DownloadButton.tsx";
import UploadButton from "../buttons/UploadButton.tsx";
import SettingsFieldPresetDropdown from "../input/SettingsFieldPresetDropdown.tsx";
import MirrorPathButton from "../buttons/MirrorPathButton.tsx";
import UndoRedoButton from "../buttons/UndoRedoButton.tsx";
import { ButtonGroup } from "@blueprintjs/core";

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
                alignItems: "center",
                pointerEvents: "none"
            }}
        >
            <div
                style={{
                    display: "flex",
                    pointerEvents: "auto",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                    backgroundColor: "#00000077",
                    borderBottomLeftRadius: 16,
                    borderBottomRightRadius: 16,
                }}
            >
                <ButtonGroup minimal>
                    <DownloadButton />
                    <UploadButton />
                    <MirrorPathButton />
                    <MirrorPathButton vertical />
                    <UndoRedoButton />
                    <UndoRedoButton redo />
                    <SettingsFieldPresetDropdown />
                    <SettingsButton />
                </ButtonGroup>
            </div>
        </div>
    )
}