import {IconButton} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import useDialogVisible from "../../hooks/Utils/useDialogVisible.ts";

export default function SettingsButton() {
    const [, setSettingsOpen] = useDialogVisible("settings");

    return (
        <IconButton
            aria-label={"Settings"}
            onClick={() => setSettingsOpen(true)}
        >
            <SettingsIcon/>
        </IconButton>
    );
}