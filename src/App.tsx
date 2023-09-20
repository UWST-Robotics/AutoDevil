import MainCanvas from "./components/canvas/MainCanvas.tsx";
import TopBar from "./components/navigation/TopBar.tsx";
import BottomBar from "./components/navigation/BottomBar.tsx";

function App() {
    return (
        <>
            <MainCanvas />
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                }}
            >
                <TopBar />
                <BottomBar />
            </div>
        </>
    )
}

export default App
