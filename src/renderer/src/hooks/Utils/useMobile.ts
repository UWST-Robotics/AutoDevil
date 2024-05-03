import React from "react";
import useWindowSize from "../Canvas/useWindowSize.ts";

export default function useMobile() {
    const [canvasWidth, canvasHeight] = useWindowSize();

    return React.useMemo(() => {
        return canvasWidth < 800 || canvasHeight < 600;
    }, [canvasWidth, canvasHeight]);
}