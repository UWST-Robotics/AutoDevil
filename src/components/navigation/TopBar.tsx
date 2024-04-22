import SettingsButton from "../buttons/SettingsButton.tsx";
import DownloadButton from "../buttons/DownloadButton.tsx";
import UploadButton from "../buttons/UploadButton.tsx";
import MirrorPathButton from "../buttons/MirrorPathButton.tsx";
import UndoRedoButton from "../buttons/UndoRedoButton.tsx";
import { Divider } from "@mui/material";
import SwitchModeButton from "../buttons/SwitchModeButton.tsx";
import MirrorOccupancyButton from "../buttons/MirrorOccupancyButton.tsx";
import RotatePathButton from "../buttons/RotatePathButton.tsx";
import RotateOccupancyButton from "../buttons/RotateOccupancyButton.tsx";

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
                    maxWidth: "100vw",
                    flexWrap: "wrap",
                    backgroundColor: "#00000077",
                    borderBottomLeftRadius: 16,
                    borderBottomRightRadius: 16,
                }}
            >
                <DownloadButton />
                <UploadButton />
                <Divider orientation="vertical" variant="middle" flexItem />
                <MirrorPathButton />
                <MirrorPathButton vertical />
                <MirrorOccupancyButton />
                <MirrorOccupancyButton vertical />
                <Divider orientation="vertical" variant="middle" flexItem />
                <RotatePathButton />
                <RotatePathButton clockwise />
                <RotateOccupancyButton />
                <RotateOccupancyButton clockwise />
                <Divider orientation="vertical" variant="middle" flexItem />
                <UndoRedoButton />
                <UndoRedoButton redo />
                <Divider orientation="vertical" variant="middle" flexItem />
                <SwitchModeButton />
                <SettingsButton />
            </div>
        </div>
    )
}