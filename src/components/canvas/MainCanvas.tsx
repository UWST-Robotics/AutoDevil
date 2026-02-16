import {Layer, Stage} from "react-konva";
import GridRenderer from "./GridRenderer.tsx";
import useWindowSize from "../../hooks/Canvas/useWindowSize.ts";
import FieldImageRenderer from "./FieldImageRenderer.tsx";
import React from "react";
import useCameraControl from "../../hooks/Canvas/useCameraControl.ts";
import WatermarkRenderer from "./WatermarkRenderer.tsx";
import AutoStepsRenderer from "./autoSteps/AutoStepsRenderer.tsx";
import PathRenderer from "./path/PathRenderer.tsx";
import {useSetSelectedAutoStepID} from "../../hooks/AutoSteps/selected/useSelectedAutoStepID.ts";
import {Paper} from "@mui/material";

export default function MainCanvas() {
    const [windowWidth, windowHeight] = useWindowSize();
    const setSelectedAutoStepID = useSetSelectedAutoStepID();
    const {stageRef, layerRef} = useCameraControl();

    // Handle On Click
    const onClick = React.useCallback(() => {
        setSelectedAutoStepID(undefined);
    }, [setSelectedAutoStepID]);

    return (
        <Paper
            tabIndex={-1}
            elevation={0}
            // onClick={() => setFocus(Scope.Canvas)}

            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "auto"
            }}
        >
            <Stage
                width={windowWidth}
                height={windowHeight}
                onClick={onClick}
                ref={stageRef}
            >
                <Layer
                    x={windowWidth / 2}
                    y={windowHeight / 2}
                    ref={layerRef}
                >
                    <WatermarkRenderer/>
                    <FieldImageRenderer/>
                    <PathRenderer/>
                    <AutoStepsRenderer/>
                    <GridRenderer
                        cellSize={12}
                        color={"#333"}
                    />
                    <GridRenderer
                        cellSize={24}
                        color={"#444"}
                    />
                </Layer>
            </Stage>
        </Paper>
    )
}