import { Button, ButtonGroup } from "@blueprintjs/core";
import SettingsButton from "../buttons/SettingsButton.tsx";

export default function TopBar() {

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: 10,
            }}
        >
            <ButtonGroup>
                <Button icon={"floppy-disk"} />
                <Button icon={"folder-open"} />
                <SettingsButton />
            </ButtonGroup>
        </div>
    )
}