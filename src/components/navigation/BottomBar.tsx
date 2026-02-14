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
                    maxWidth: "100vw",
                    padding: 10,
                    backgroundColor: "#00000077",
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                }}
            >
            </div>
        </div>
    );
}