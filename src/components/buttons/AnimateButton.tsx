import useIsAnimating from "../../hooks/Canvas/useIsAnimating.ts";
import { Button } from "@blueprintjs/core";

export default function AnimateButton() {
    const [isAnimating, setIsAnimating] = useIsAnimating();

    return (
        <Button
            minimal
            icon={isAnimating ? "stop" : "play"}
            onClick={() => setIsAnimating(!isAnimating)}
        />
    )
}