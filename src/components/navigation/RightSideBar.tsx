import PointEditorPanel from "../panels/PointEditorPanel.tsx";
import useSettingsValue from "../../hooks/Utils/useSettings.ts";
import useMobile from "../../hooks/Utils/useMobile.ts";

export default function RightSideBar() {
    const { showOccupancyGrid } = useSettingsValue();
    const isMobile = useMobile();

    if (showOccupancyGrid)
        return null;

    // Mobile
    if (isMobile)
        return (
            <div
                style={{
                    position: "absolute",
                    top: 100,
                    right: 40,
                    left: 40,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    pointerEvents: "none"
                }}
            >
                <PointEditorPanel />
            </div>
        );

    // Desktop
    return (
        <div
            style={{
                position: "absolute",
                top: 60,
                right: 40,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                pointerEvents: "none",
                width: 300
            }}
        >
            <PointEditorPanel />
        </div>
    )

}