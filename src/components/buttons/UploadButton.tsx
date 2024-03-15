import usePathUpload from "../../hooks/FileIO/usePathUpload.ts";
import { IconButton } from "@mui/material";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

export default function UploadButton() {
    const uploadPath = usePathUpload();

    return (
        <IconButton
            aria-label={"Upload Path"}
            onClick={uploadPath}
        >
            <FolderOpenIcon />
        </IconButton>
    );
}