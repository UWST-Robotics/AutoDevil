import usePathDownload from "../../hooks/FileIO/usePathDownload.ts";
import { IconButton } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

export default function DownloadButton() {
    const downloadPath = usePathDownload();

    return (
        <IconButton
            aria-label={"Download Path"}
            onClick={downloadPath}
        >
            <SaveIcon />
        </IconButton>
    );
}