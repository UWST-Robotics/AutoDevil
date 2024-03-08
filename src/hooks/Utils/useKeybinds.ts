import { useSelectedPointValue } from "../Point/useSelectPoint.ts";
import useDeletePoint from "../Point/useDeletePoint.ts";
import { HotkeyConfig, useHotkeys } from "@blueprintjs/core";
import React from "react";

export default function useKeybinds() {
    const deletePoint = useDeletePoint();
    const selectedPointID = useSelectedPointValue();

    const hotkeys = React.useMemo<HotkeyConfig[]>(() => [
        {
            combo: "backspace",
            global: true,
            label: "Delete Point",
            onKeyDown: () => {
                if (selectedPointID)
                    deletePoint(selectedPointID);
            }
        },
        {
            combo: "delete",
            global: true,
            label: "Delete Point",
            onKeyDown: () => {
                if (selectedPointID)
                    deletePoint(selectedPointID);
            }
        }
    ], [deletePoint, selectedPointID]);

    return useHotkeys(hotkeys);
}