import { Button, ButtonGroup } from "@blueprintjs/core";
import useIsAnimating from "../../hooks/Canvas/useIsAnimating.ts";

export default function BottomBar() {
    const [isAnimating, setIsAnimating] = useIsAnimating();

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
                    onClick={() => setIsAnimating(true)}
                    disabled={isAnimating}
                />
                <Button
                    icon={"stop"}
                    intent={"danger"}
                    onClick={() => setIsAnimating(false)}
                    disabled={!isAnimating}
                />
                <Button
                    icon={"chart"}
                    intent={"primary"}
                />
            </ButtonGroup>
        </div>
    );
}