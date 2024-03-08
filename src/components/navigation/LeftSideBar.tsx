import ScrollablePointList from "../panels/ScrollablePointList.tsx";

export default function LeftSideBar() {
    return (
        <div
            style={{
                width: 250,
                height: "100%",
                backgroundColor: "#252A31",
                position: "fixed",
                top: 0,
                left: 0,
                pointerEvents: "all",
                overflowY: "auto",
                padding: 10
            }}
        >
            <ScrollablePointList />
        </div>
    )

}