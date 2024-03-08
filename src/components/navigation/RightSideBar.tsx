import PointEditorPanel from "../panels/PointEditorPanel.tsx";

export default function RightSideBar() {
    return (
        <div
            style={{
                width: 250,
                height: "100%",
                backgroundColor: "#252A31",
                position: "fixed",
                top: 0,
                right: 0,
                pointerEvents: "all",
                padding: 20
            }}
        >
            <PointEditorPanel />
        </div>
    )

}