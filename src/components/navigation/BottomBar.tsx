import { Button, ButtonGroup } from "@blueprintjs/core";

export default function BottomBar() {
    return (
        <div
            style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: 10,
                pointerEvents: "auto",
            }}
        >
            <ButtonGroup large>
                <Button
                    icon={"play"}
                    intent={"success"}
                />
                <Button
                    icon={"stop"}
                    intent={"danger"}
                    disabled
                />
                <Button
                    icon={"chart"}
                    intent={"primary"}
                />
            </ButtonGroup>
        </div>
    );
}