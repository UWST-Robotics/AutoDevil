import ScopeSlider from "../input/ScopeSlider.tsx";
import AnimateButton from "../buttons/AnimateButton.tsx";
import useSettingsValue from "../../hooks/Utils/useSettings.ts";

export default function BottomBar() {
    const { showOccupancyGrid } = useSettingsValue();

    if (showOccupancyGrid)
        return null;
    return (
        <div
            style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pointerEvents: "none"
            }}
        >
            <div
                style={{
                    display: "flex",
                    pointerEvents: "auto",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                    backgroundColor: "#00000077",
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                }}
            >
                <AnimateButton />
                <ScopeSlider />
            </div>
        </div>
    );
}