import PointEditorPanel from "../panels/PointEditorPanel.tsx";
import useSettingsValue from "../../hooks/Utils/useSettings.ts";

export default function RightSideBar() {
    const { showOccupancyGrid } = useSettingsValue();

    if (showOccupancyGrid)
        return null;
    return (
        <div
            style={{
                position: "absolute",
                top: 50,
                right: 40,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                pointerEvents: "none",
                width: 300,
            }}
        >
            <PointEditorPanel />
        </div>
    )

}