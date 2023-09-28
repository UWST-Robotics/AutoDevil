import { Button } from "@blueprintjs/core";
import usePathDownload from "../../hooks/FileIO/usePathDownload.ts";

export default function DownloadButton() {
    const downloadPath = usePathDownload();

    return (
        <>
            <Button
                icon={"floppy-disk"}
                onClick={() => downloadPath()}
            />
        </>
    );
}