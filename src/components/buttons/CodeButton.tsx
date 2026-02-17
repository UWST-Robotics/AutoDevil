import {IconButton} from "@mui/material";
import useDialogVisible from "../../hooks/Utils/useDialogVisible.ts";
import {Code} from "@mui/icons-material";

export default function CodeButton() {
    const [, setVisible] = useDialogVisible("code");

    return (
        <IconButton
            aria-label={"Code"}
            onClick={() => setVisible(true)}
        >
            <Code/>
        </IconButton>
    );
}