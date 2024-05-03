import MainCanvas from "./components/canvas/MainCanvas.tsx";
import TopBar from "./components/navigation/TopBar.tsx";
import BottomBar from "./components/navigation/BottomBar.tsx";
import GlobalHooks from "./components/GlobalHooks.tsx";
import RightSideBar from "./components/navigation/RightSideBar.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import useElectronListener from "./hooks/Electron/useElectronListener.ts";
import AboutModal from "./components/modals/AboutModal.tsx";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    useElectronListener();

    return (
        <ThemeProvider theme={darkTheme}>
            <GlobalHooks />
            <MainCanvas />
            <AboutModal />
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
                <RightSideBar />
            </div>
        </ThemeProvider>
    )
}

export default App
