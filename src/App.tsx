import MainCanvas from "./components/canvas/MainCanvas.tsx";
import TopBar from "./components/navigation/TopBar.tsx";
import BottomBar from "./components/navigation/BottomBar.tsx";
import GlobalHooks from "./components/GlobalHooks.tsx";
import SideBar from "./components/navigation/SideBar.tsx";

function App() {
    return (
        <>
            <GlobalHooks />
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
                <SideBar />
            </div>
        </>
    )
}

export default App
