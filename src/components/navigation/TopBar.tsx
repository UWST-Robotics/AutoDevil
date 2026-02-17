import SettingsButton from "../buttons/SettingsButton.tsx";
import UploadButton from "../buttons/UploadButton.tsx";
import {Paper, Typography} from "@mui/material";
import MirrorAutoStepsButton from "../buttons/MirrorAutoStepsButton.tsx";
import UndoRedoButton from "../buttons/UndoRedoButton.tsx";
import RotateAutoStepsButton from "../buttons/RotateAutoStepsButton.tsx";
import CodeButton from "../buttons/CodeButton.tsx";
import AutoNameEditor from "./topbar/AutoNameEditor.tsx";
import NavDivider from "./topbar/NavDivider.tsx";
import DownloadButton from "../buttons/DownloadButton.tsx";

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
                zIndex: 2,
            }}
            // onMouseDown={() => setFocus(Scope.Navigation)}
        >
            <AutoNameEditor/>
            <NavDivider/>
            <DownloadButton/>
            <UploadButton/>
            <CodeButton/>
            <NavDivider/>
            <MirrorAutoStepsButton/>
            <MirrorAutoStepsButton vertical/>
            <NavDivider/>
            <RotateAutoStepsButton/>
            <RotateAutoStepsButton clockwise/>
            <NavDivider/>
            <UndoRedoButton/>
            <UndoRedoButton redo/>

            <Typography sx={{flexGrow: 1}}/>

            <SettingsButton/>
        </Paper>
    )
}