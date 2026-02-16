import SettingsButton from "../buttons/SettingsButton.tsx";
import DownloadButton from "../buttons/DownloadButton.tsx";
import UploadButton from "../buttons/UploadButton.tsx";
import {Divider, Paper} from "@mui/material";
import MirrorAutoStepsButton from "../buttons/MirrorAutoStepsButton.tsx";
import UndoRedoButton from "../buttons/UndoRedoButton.tsx";
import RotateAutoStepsButton from "../buttons/RotateAutoStepsButton.tsx";
import CodeButton from "../buttons/CodeButton.tsx";

export default function TopBar() {

    return (
        <Paper
            elevation={1}
            square
            sx={{
                flexShrink: 0,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                padding: "5px 20px",
                overflowX: "hidden",
                overflowY: "auto",
                pointerEvents: "auto",
                boxShadow: "0 4px 4px rgba(0,0,0,0.2)",
                zIndex: 2
            }}
            // onMouseDown={() => setFocus(Scope.Navigation)}
        >
            <DownloadButton/>
            <UploadButton/>
            <CodeButton/>
            <Divider orientation="vertical" variant="middle" flexItem/>
            <MirrorAutoStepsButton/>
            <MirrorAutoStepsButton vertical/>
            <Divider orientation="vertical" variant="middle" flexItem/>
            <RotateAutoStepsButton/>
            <RotateAutoStepsButton clockwise/>
            <Divider orientation="vertical" variant="middle" flexItem/>
            <UndoRedoButton/>
            <UndoRedoButton redo/>
            <Divider orientation="vertical" variant="middle" flexItem/>
            <SettingsButton/>
        </Paper>
    )
}