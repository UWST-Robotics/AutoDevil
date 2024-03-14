import useSelectedPoint from "../../hooks/Point/useSelectPoint.ts";
import { usePathPoint } from "../../hooks/Point/usePathPoint.ts";
import { DEFAULT_GUID } from "../../utils/generateGUID.ts";
import PointBooleanInput from "../input/PointBooleanInput.tsx";
import EventsEditorPanel from "./EventsEditorPanel.tsx";
import useDeletePoint from "../../hooks/Point/useDeletePoint.ts";
import usePrevPathPointValue from "../../hooks/Point/usePrevPathPoint.ts";
import useNextPathPointValue from "../../hooks/Point/useNextPathPoint.ts";
import React from "react";
import { IconButton } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import TrashIcon from "@mui/icons-material/Delete";

export default function PointEditorPanel() {
    const [selectedPointID, setSelectedPointID] = useSelectedPoint();
    const prevPoint = usePrevPathPointValue(selectedPointID ?? DEFAULT_GUID);
    const nextPoint = useNextPathPointValue(selectedPointID ?? DEFAULT_GUID);
    const [point] = usePathPoint(selectedPointID ?? DEFAULT_GUID);
    //const pointState = useState()
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

    // Format X,Y
    //const x = point?.x.toFixed(2);
    //const y = point?.y.toFixed(2);
    //const r = (180 / Math.PI * (point?.r ?? 0)).toFixed(2);

    if (!selectedPointID || !point)
        return null;
    return (
        <div
            style={{
                borderRadius: 16,
                margin: 10,
                padding: 16,
                backgroundColor: "#00000077",
                pointerEvents: "auto",
                textAlign: "center",
            }}
        >
            <IconButton
                onClick={selectPrevPoint}
                disabled={!prevPoint}
                style={{ float: "left" }}
            >
                <KeyboardDoubleArrowLeftIcon />
            </IconButton>
            <IconButton
                onClick={selectNextPoint}
                disabled={!nextPoint}
                style={{ float: "right" }}
            >
                <KeyboardDoubleArrowRightIcon />
            </IconButton>
            <PointBooleanInput
                label={"Reverse"}
                setting={"isReversed"}
            />
            <EventsEditorPanel />
            <IconButton
                color={"error"}
                onClick={() => deletePoint(selectedPointID)}
            >
                <TrashIcon />
            </IconButton>
        </div>
    )
}