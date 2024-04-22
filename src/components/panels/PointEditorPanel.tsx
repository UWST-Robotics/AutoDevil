import useSelectedPoint from "../../hooks/Point/useSelectPoint.ts";
import { usePathPoint } from "../../hooks/Point/usePathPoint.ts";
import { DEFAULT_GUID } from "../../utils/generateGUID.ts";
import useDeletePoint from "../../hooks/Point/useDeletePoint.ts";
import usePrevPathPointValue from "../../hooks/Point/usePrevPathPoint.ts";
import useNextPathPointValue from "../../hooks/Point/useNextPathPoint.ts";
import React from "react";
import { Box, ButtonGroup, Divider, IconButton, Tooltip } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import TrashIcon from "@mui/icons-material/Delete";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import EventsEditorPanel from "./EventsEditorPanel.tsx";
import AddEventButton from "../buttons/AddEventButton.tsx";
import PointTransformInputs from "../input/PointTransformInputs.tsx";

export default function PointEditorPanel() {
    const [selectedPointID, setSelectedPointID] = useSelectedPoint();
    const prevPoint = usePrevPathPointValue(selectedPointID ?? DEFAULT_GUID);
    const nextPoint = useNextPathPointValue(selectedPointID ?? DEFAULT_GUID);
    const [point, setPoint] = usePathPoint(selectedPointID ?? DEFAULT_GUID);
    const deletePoint = useDeletePoint();

    // Select next/prev point
    const selectNextPoint = React.useCallback(() => {
        if (nextPoint)
            setSelectedPointID(nextPoint.id);
    }, [setSelectedPointID, nextPoint])
    const selectPrevPoint = React.useCallback(() => {
        if (prevPoint)
            setSelectedPointID(prevPoint.id);
    }, [setSelectedPointID, prevPoint]);

    // Reverse point
    const onReverseChange = React.useCallback(() => {
        if (!point)
            return;
        setPoint({ ...point, isReversed: !point.isReversed });
    }, [point, setPoint]);

    if (!selectedPointID || !point)
        return null;
    return (
        <div
            style={{
                borderRadius: 16,
                margin: 10,
                padding: 15,
                backgroundColor: "#00000077",
                pointerEvents: "auto",
                textAlign: "center",
                width: "100%"
            }}
        >
            <Box
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <IconButton
                    onClick={selectPrevPoint}
                    disabled={!prevPoint}
                    style={{ float: "left" }}
                >
                    <KeyboardDoubleArrowLeftIcon />
                </IconButton>
                <PointTransformInputs />
                <IconButton
                    onClick={selectNextPoint}
                    disabled={!nextPoint}
                    style={{ float: "right" }}
                >
                    <KeyboardDoubleArrowRightIcon />
                </IconButton>
            </Box>
            <Divider
                style={{ marginTop: 15 }}
            />
            <EventsEditorPanel />
            <ButtonGroup>
                <Tooltip title={"Change Direction"}>
                    <IconButton
                        onClick={onReverseChange}
                        color={point.isReversed ? "error" : "success"}
                    >
                        <SwapVertIcon />
                    </IconButton>
                </Tooltip>
                <AddEventButton />
                <IconButton
                    onClick={() => deletePoint(selectedPointID)}
                >
                    <TrashIcon />
                </IconButton>
            </ButtonGroup>
        </div>
    )
}