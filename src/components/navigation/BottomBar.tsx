import ScopeSlider from "../input/ScopeSlider.tsx";
import AnimateButton from "../buttons/AnimateButton.tsx";
import useSettingsValue from "../../hooks/Utils/useSettings.ts";
import OccupancyToolButton from "../buttons/OccupancyToolButton.tsx";

export default function BottomBar() {
    const { showOccupancyGrid } = useSettingsValue();

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
                    maxWidth: "100vw",
                    padding: 10,
                    backgroundColor: "#00000077",
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                }}
            >
                {!showOccupancyGrid && (<AnimateButton />)}
                {!showOccupancyGrid && (<ScopeSlider />)}

                {showOccupancyGrid && (<OccupancyToolButton tool={"Pan"} />)}
                {showOccupancyGrid && (<OccupancyToolButton tool={"Draw"} />)}
                {showOccupancyGrid && (<OccupancyToolButton tool={"Fill"} />)}
            </div>
        </div>
    );
}