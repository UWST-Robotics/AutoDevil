import ScopeSlider from "../input/ScopeSlider.tsx";
import AnimateButton from "../buttons/AnimateButton.tsx";

export default function BottomBar() {

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
                <div style={{ maxWidth: 500, marginLeft: 20, marginRight: 20 }}>
                    <ScopeSlider />
                </div>
            </div>
        </div>
    );
}