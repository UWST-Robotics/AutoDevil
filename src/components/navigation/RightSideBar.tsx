import PointEditorPanel from "../panels/PointEditorPanel.tsx";

export default function RightSideBar() {
    return (
        <div
            style={{
                position: "absolute",
                top: 20,
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