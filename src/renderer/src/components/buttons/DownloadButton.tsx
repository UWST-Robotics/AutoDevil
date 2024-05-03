import useFileDownload from "../../hooks/FileIO/useFileDownload.ts";
import { IconButton } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

export default function DownloadButton() {
    const download = useFileDownload();

    return (
        <IconButton
            aria-label={"Download Path"}
            onClick={download}
        >
            <SaveIcon />
        </IconButton>
    );
}