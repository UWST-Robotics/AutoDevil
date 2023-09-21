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
                justifyContent: "center",
                padding: 10,
                pointerEvents: "auto",
            }}
        >
            <PointEditorPanel />
        </div>
    )
}