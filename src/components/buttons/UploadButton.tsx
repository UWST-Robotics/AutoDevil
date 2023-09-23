import { Button } from "@blueprintjs/core";
import usePathUpload from "../../hooks/FileIO/usePathUpload.ts";

export default function UploadButton() {
    const uploadPath = usePathUpload();

    return (
        <>
            <Button
                icon={"folder-open"}
                onClick={() => uploadPath()}
            />
        </>
    );
}