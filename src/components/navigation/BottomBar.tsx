import { Button, ButtonGroup } from "@blueprintjs/core";
import useIsAnimating from "../../hooks/Canvas/useIsAnimating.ts";
import GraphButton from "../buttons/GraphButton.tsx";
import ScopeSlider from "../input/ScopeSlider.tsx";

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
                flexDirection: "column",
                pointerEvents: "none",
                padding: 10
            }}
        >
            <div style={{
                maxWidth: 400,
                margin: "auto",
            }}>
                <ButtonGroup
                    large
                    fill
                    style={{
                        pointerEvents: "auto",
                    }}
                >
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
                    <GraphButton />
                </ButtonGroup>
                <div style={{
                    pointerEvents: "auto"
                }}>
                    <ScopeSlider />
                </div>
            </div>
        </div>
    );
}