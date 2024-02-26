import PointEditorPanel from "../panels/PointEditorPanel.tsx";

export default function SideBar() {
    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                right: 0,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                padding: 10,
                pointerEvents: "none"
            }}
        >
            <PointEditorPanel />
        </div>
    )
}