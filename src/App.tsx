import MainCanvas from "./components/canvas/MainCanvas.tsx";
import TopBar from "./components/navigation/TopBar.tsx";
import BottomBar from "./components/navigation/BottomBar.tsx";
import GlobalHooks from "./components/GlobalHooks.tsx";
import LeftSideBar from "./components/navigation/LeftSideBar.tsx";
import RightSideBar from "./components/navigation/RightSideBar.tsx";

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
                <LeftSideBar />
                <RightSideBar />
            </div>
        </>
    )
}

export default App
