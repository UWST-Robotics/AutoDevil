import useFileUpload from "../../hooks/FileIO/useFileUpload.ts";
import { IconButton } from "@mui/material";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

export default function UploadButton() {
    const upload = useFileUpload();

    return (
        <IconButton
            aria-label={"Upload Path"}
            onClick={upload}
        >
            <FolderOpenIcon />
        </IconButton>
    );
}